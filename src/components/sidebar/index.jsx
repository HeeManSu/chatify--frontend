import { AddIcon } from "@chakra-ui/icons";
import { Avatar, IconButton } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateChatButton from "../create-chat";
import { useNavigate } from "react-router-dom";
import { selectChat } from "../../redux/reducers/chat-slice";

function Sidebar() {
  const { chats } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  return (
    <aside className="h-full w-1/5 border-r px-3">
      <header className="h-14 border-b flex items-center justify-between">
        <h1 className="text-xl">Chatify</h1>
        <CreateChatButton />
      </header>
      <div className="py-3">
        {chats?.map((chat) => {
          const chatName = chat.isGroupChat ? chat.name : chat.user.name;
          const avatarUrl = chat.isGroupChat
            ? chat.avatar?.url
            : chat.user.avatar?.url;
          return (
            <div
              key={chat._id}
              className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-transparent/5"
              onClick={() => {
                dispatch(selectChat(chat));
              }}
            >
              <Avatar src={avatarUrl} name={chatName} />
              <div>
                <h3 className="text-lg">{chatName}</h3>
                {chat.lastMessage && (
                  <p className="text-sm text-gray-400">
                    {chat.lastMessage.content}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export default Sidebar;
