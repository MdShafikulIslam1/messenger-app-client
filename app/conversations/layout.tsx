import getAllUser from "../action/getAllUser";
import getConversations from "../action/getConversations";
import ConversationList from "../components/ConversationList";
import Sidebar from "../components/Sidebar";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();

  const users = await getAllUser();
  return (
    <Sidebar>
      <ConversationList initialItems={conversations} users={users} />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
