"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import Avatar from "./Avatar";

interface UserBoxProps {
  user: User;
}

const UserBox: React.FC<UserBoxProps> = ({ user }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);
    axios
      .post("/api/conversations", {
        userId: user?.id,
      })
      .then((response) => {
        router.push(`/conversations/${response.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [router, user]);

  return (
    <div
      className="w-full relative flex space-x-3 items-center p-3 bg-white hover:bg-neutral-100 rounded-lg cursor-pointer"
      onClick={handleClick}
    >
      <Avatar user={user} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
