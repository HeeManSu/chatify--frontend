import { useEffect } from "react";
import { getChats } from "../redux/reducers/chat-slice";
import { useDispatch, useSelector } from "react-redux";
import CreateChatButton from "../components/create-chat";
import Sidebar from "../components/sidebar";
import ChatWindow from "../components/chat-window";

const ChatPage = () => {
  const dispatch = useDispatch();
  const { selectedChat } = useSelector((state) => state.chat);
  useEffect(() => {
    dispatch(getChats());
  }, []);
  return (
    <div className="h-full flex">
      <Sidebar />
      {!selectedChat && (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-2xl text-gray-400">
            Select a chat to start messaging
          </p>
        </div>
      )}
      {selectedChat && <ChatWindow />}
    </div>
  );
};

export default ChatPage;
