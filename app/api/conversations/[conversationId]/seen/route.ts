import getCurrentUser from "@/app/action/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

interface IParams {
  conversationId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = params;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    if (!conversation) {
      return new NextResponse("Invalid conversationId", { status: 400 });
    }

    //find last message
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    //update message
    const updateMessage = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },
      data: {
        seen: {
          connect: {
            id: currentUser?.id,
          },
        },
      },
      include: {
        sender: true,
        seen: true,
      },
    });

    //update all connection with new seen users

    await pusherServer.trigger(currentUser?.email!, "conversation:update", {
      id: conversationId,
      messages: [updateMessage],
    });

    if (lastMessage.seenIds?.indexOf(currentUser?.id) !== -1) {
      return NextResponse.json(conversation);
    }

    //update last message seen

    await pusherServer.trigger(
      conversationId!,
      "messages:update",
      updateMessage
    );

    return new NextResponse("Success");
  } catch (error) {
    console.log("SEEN_MESSAGE_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
