"use client";

import { useSession } from "next-auth/react";
import { FullMessageType } from "../types";
import { User } from "@prisma/client";
import clsx from "clsx";
import Avatar from "./Avatar";
import { format } from "date-fns";
import Image from "next/image";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox = ({ data, isLast }: MessageBoxProps) => {
  const session = useSession();
  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenList = (data?.seen || [])
    .filter((user: User) => user?.email !== data?.sender?.email)
    .map((user: User) => user?.name)
    .join(", ");

  //dynamic class name as variable

  const container = clsx("flex gap-2 p-4", isOwn && "justify-end");
  const avatar = clsx(isOwn && "order-2");
  const body = clsx("flex gap-2 flex-col", isOwn && "items-end");
  const message = clsx(
    "text-sm w-fit overflow-hidden ",
    isOwn ? "bg-sky-500 text-white" : "bg-gray-500",
    data?.image ? "rounded-md p-0" : "rounded-md py-2 px-3"
  );
  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data?.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{data?.sender?.name}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(data?.createdAt), "p")}
          </div>
        </div>
        <div className={message}>
          {data?.image ? (
            <Image
              src={data?.image}
              alt="image"
              height={288}
              width={288}
              className="object-cover cursor-pointer hover:scale-110 transition translate"
            />
          ) : (
            <div>{data?.body}</div>
          )}
        </div>

        {isLast && isOwn && seenList.length > 0 && (
          <div className="text-xs font-light text-gray-500">
            {`seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
