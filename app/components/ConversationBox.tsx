import React, { useCallback, useMemo } from "react";

import { useSession } from "next-auth/react";
import useOtherUser from "../hooks/useOtherUser";
import { useRouter } from "next/navigation";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import Avatar from "./Avatar";
import { format } from "date-fns";
type ConversationBoxProps = {
  data: FullConversationType;
  selected?: boolean;
};
const ConversationBox = ({ data, selected }: ConversationBoxProps) => {
  const router = useRouter();
  const session = useSession();
  const otherUser = useOtherUser(data);

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessages = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session?.data?.user?.email;
  }, [session?.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessages) {
      return false;
    }

    const seenArray = lastMessages.seen || [];
    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail).length === 0;
  }, [lastMessages, userEmail]);

  const lastMessageText = useMemo(() => {
    if (lastMessages?.image) {
      return "Sent an Image";
    }
    if (lastMessages?.body) {
      return lastMessages.body;
    }
    return "Started a conversation";
  }, [lastMessages]);

  return (
    <div
      className={clsx(
        `w-full relative flex items-center space-x-3 rounded-lg hover:bg-neutral-300 transition cursor-pointer p-3`,
        selected ? "bg-neutral-100" : "bg-white"
      )}
      onClick={handleClick}
    >
      <Avatar user={data} />

      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p>{data?.name || otherUser?.name}</p>
            {lastMessages?.createdAt && (
              <p className="text-xs text-gray-400 font-light">
                {format(new Date(lastMessages.createdAt), "p")}
              </p>
            )}
          </div>
          <p
            className={clsx(
              `truncate text-sm`,
              hasSeen ? "text-gray-500 " : "text-black font-medium"
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
