"use client";

import { MdOutlineGroupAdd } from "react-icons/md";

import { useRouter } from "next/navigation";
import { FullConversationType } from "../types";
import useConversation from "../hooks/useConversation";
import { useState } from "react";
import clsx from "clsx";
import ConversationBox from "./ConversationBox";

interface ConversationListProps {
  initialItems: FullConversationType[];
}

const ConversationList = ({ initialItems }: ConversationListProps) => {
  const [items, setItems] = useState(initialItems);
  const router = useRouter();
  const { isOpen, conversationId } = useConversation();

  return (
    <aside
      className={clsx(
        `fixed inset-y-0 lg:left-20 lg:w-80 pb-20 lg:pb-0 lg:block overflow-y-auto border-r border-gray-200`,
        isOpen ? "hidden" : "block w-full left-0"
      )}
    >
      <div className="px-5">
        <div className="flex justify-between mb-4 pt-4">
          <div className="text-2xl font-bold text-neutral-800">Messages</div>
          <div className="rounded-full bg-gray-100 p-2 text-gray-600 cursor-pointer hover:opacity-75 transition">
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>

        {items?.map((item) => (
          <ConversationBox
            key={item?.id}
            data={item}
            selected={conversationId === item?.id}
          />
        ))}
      </div>
    </aside>
  );
};

export default ConversationList;
