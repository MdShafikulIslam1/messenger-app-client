"use client";
import { User } from "@prisma/client";
import Image from "next/image";
import isActive from "@/utils/IsActive";

interface AvatarProps {
  user?: User;
}

const Avatar = ({ user }: AvatarProps) => {
  const active = isActive(user?.email!);
  return (
    <div className="relative ">
      <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full inline-block overflow-hidden">
        <Image
          src={user?.image || "/images/placeholder.jpg"}
          alt="avatar"
          fill
        />
      </div>
      {active && (
        <span className="absolute top-0 right-0 bg-green-500 ring-2 ring-white h-2 w-2 md:w-3 md:h-3 block rounded-full" />
      )}
    </div>
  );
};

export default Avatar;
