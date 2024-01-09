"use client";

import { useEffect, useRef, useState } from "react";
import { FullMessageType } from "../types";
import MessageBox from "./MessageBox";
import useConversation from "../hooks/useConversation";
import axios from "axios";
import { pusherClient } from "../libs/pusher";
import { find } from "lodash";

interface BodyProps {
  initialMessage: FullMessageType[];
}

const Body = ({ initialMessage }: BodyProps) => {
  const [messages, setMessages] = useState(initialMessage);
  const { conversationId } = useConversation();

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }
        return [...current, message];
      });
      bottomRef.current?.scrollIntoView();
    };

    pusherClient.bind("messages:new", messageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
    };
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, index) => (
        <MessageBox
          key={index}
          isLast={index === messages.length - 1}
          data={message}
        />
      ))}

      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default Body;
