"use client";

import { useParams, usePathname } from "next/navigation";
import EmptyState from "../components/EmptyState";
import useConversation from "../hooks/useConversation";

const ConversationHomePage = () => {

  const { isOpen } = useConversation();
  return (
    <div>
      <EmptyState />
    </div>
  );
};

export default ConversationHomePage;
