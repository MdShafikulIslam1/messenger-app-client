import getCurrentUser from "@/app/action/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

export const POST = async (request: Request) => {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { userId, isGroup, members, name } = body;

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (isGroup && (!name || !members || members.length < 2)) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    if (isGroup) {
      const newConversations = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member?.value,
              })),
              { id: currentUser?.id },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      newConversations?.users.forEach((user) => {
        if (user?.email) {
          pusherServer.trigger(
            user.email,
            "conversation:new",
            newConversations
          );
        }
      });

      return NextResponse.json(newConversations);
    }

    const existingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });

    const singleConversation = existingConversations[0];
    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    const newSingleConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [{ id: currentUser.id }, { id: userId }],
        },
      },
      include: {
        users: true,
      },
    });

    newSingleConversation?.users.forEach((user) => {
      if (user?.email) {
        pusherServer.trigger(
          user.email,
          "conversation:new",
          newSingleConversation
        );
      }
    });

    return NextResponse.json(newSingleConversation);
  } catch (error) {
    return new NextResponse("internal error", { status: 500 });
  }
};
