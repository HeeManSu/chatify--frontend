import { Avatar } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

function ChatWindow() {
  const { selectedChat } = useSelector((state) => state.chat);
  const chatName = selectedChat.isGroupChat
    ? selectedChat.name
    : selectedChat.user.name;
  const avatarUrl = selectedChat.isGroupChat
    ? selectedChat.avatar?.url
    : selectedChat.user.avatar?.url;
  return (
    <div className="w-4/5">
      <header className="h-14 px-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar src={avatarUrl} name={chatName} />
          <span>{chatName}</span>
        </div>
      </header>
    </div>
  );
}

export default ChatWindow;
