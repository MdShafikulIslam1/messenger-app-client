import getConversationById from "@/app/action/getConversationById";
import getMessages from "@/app/action/getMessages";
import Body from "@/app/components/Body";
import EmptyState from "@/app/components/EmptyState";
import Form from "@/app/components/Form";
import Header from "@/app/components/Header";

interface IParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params?.conversationId);
  const messages = await getMessages(params?.conversationId);


  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="flex flex-col h-full">
          <EmptyState />
        </div>
      </div>
    );
  }
  return (
    <div className="lg:pl-80 h-full">
      <div className="flex flex-col h-full">
        <Header conversation={conversation!} />
        <Body initialMessage={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ConversationId;
