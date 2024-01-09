import getCurrentUser from "@/app/action/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const { name, image } = await req.json();
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const updatedUserProfile = await prisma.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        name,
        image,
      },
    });

    return new NextResponse("Successfully updated your profile");
  } catch (error) {
    console.log("USER_NAME_IMAGE_UPDATE_ERROR", error);
    return new NextResponse("INTERNAL_ERROR", { status: 500 });
  }
}
