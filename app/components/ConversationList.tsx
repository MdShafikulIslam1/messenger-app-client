"use client";

import { MdOutlineGroupAdd } from "react-icons/md";

import { useRouter } from "next/navigation";
import { FullConversationType } from "../types";
import useConversation from "../hooks/useConversation";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "../libs/pusher";
import { find } from "lodash";

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
}

const ConversationList = ({ initialItems, users }: ConversationListProps) => {
  const session = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState(initialItems);
  const router = useRouter();
  const { isOpen, conversationId } = useConversation();

  const pusherKey = useMemo(() => {
    return session?.data?.user?.email;
  }, [session?.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    const newConversationHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }
        return [conversation, ...current];
      });
    };

    const updateConversationHandler = (
      updateConversation: FullConversationType
    ) => {
      setItems((current) =>
        current?.map((currentConversation) => {
          if (currentConversation?.id === updateConversation?.id) {
            return {
              ...currentConversation,
              messages: updateConversation.messages,
            };
          }
          return currentConversation;
        })
      );
    };

    const deleteConversationHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [
          ...current?.filter(
            (currentConversation) => currentConversation.id !== conversation.id
          ),
        ];
      });

      if (conversationId === conversation?.id) {
        router.push("/conversations");
      }
    };

    pusherClient.subscribe(pusherKey);
    pusherClient.bind("conversation:new", newConversationHandler);
    pusherClient.bind("conversation:update", updateConversationHandler);
    pusherClient.bind("conversation:delete", deleteConversationHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newConversationHandler);
      pusherClient.unbind("conversation:update", updateConversationHandler);
      pusherClient.unbind("conversation:delete", deleteConversationHandler);
    };
  }, [pusherKey, conversationId, router]);

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(
          `fixed inset-y-0 lg:left-20 lg:w-80 pb-20 lg:pb-0 lg:block overflow-y-auto border-r border-gray-200`,
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800">Messages</div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="rounded-full bg-gray-100 p-2 text-gray-600 cursor-pointer hover:opacity-75 transition"
            >
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
    </>
  );
};

export default ConversationList;
