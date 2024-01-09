"use client";

import { useEffect, useRef, useState } from "react";
import { FullMessageType } from "../types";
import MessageBox from "./MessageBox";
import useConversation from "../hooks/useConversation";
import axios from "axios";

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
