"use client";

import { Conversation, User } from "@prisma/client";
import useOtherUser from "../hooks/useOtherUser";
import { useMemo, useState } from "react";
import Link from "next/link";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import Avatar from "./Avatar";
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "./AvatarGroup";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header = ({ conversation }: HeaderProps) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const otherUser = useOtherUser(conversation);

  const statusText = useMemo(() => {
    if (conversation?.isGroup) {
      return `${conversation.users.length} members`;
    }
    return "Active";
  }, [conversation]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div className="bg-white w-full px-4 py-3 sm:px-4 lg:px-6 flex justify-between items-center border-b-[1px] shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/conversations"
            className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation?.isGroup ? (
            <AvatarGroup users={conversation?.users} />
          ) : (
            <Avatar user={otherUser!} />
          )}
          <div className="flex flex-col">
            <div>{conversation?.name || otherUser?.name}</div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <div onClick={() => setDrawerOpen(true)}>
          <HiEllipsisHorizontal
            size={32}
            className="text-sky-500 hover:text-sky-600 transition cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};

export default Header;
