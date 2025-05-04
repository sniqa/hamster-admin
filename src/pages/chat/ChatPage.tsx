import { Card } from "@/components/ui/card";
import ChatMessageSidebar from "./ChatMessageSidebar";
import ChatMessageHeader from "./ChatMessageHeader";
import ChatMessageContent from "./ChatMessageContent";
import ChatMessageFooter from "./ChatMessageFooter";

const ChatPage = () => {
  return (
    <Card className="mr-2 w-full h-full">
      <div className="flex">
        <ChatMessageSidebar />

        <div className="bg-amber-200 flex flex-col">
          <ChatMessageHeader />

          <ChatMessageContent />

          <ChatMessageFooter />
        </div>
      </div>
    </Card>
  );
};

export default ChatPage;
