import { createContext, ReactNode, useContext } from "react";

export type ChatContextType = {};

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  return <ChatContext value={}>{children}</ChatContext>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useChatContext = () => {
  const chatContext = useContext(ChatContext);

  if (!chatContext) {
    throw new Error("useDeviceContext has to be used within <ChatContext>");
  }

  return chatContext;
};
