import { useEffect } from "react";
import { getChats } from "../redux/reducers/chat-slice";
import { useDispatch, useSelector } from "react-redux";
import CreateChatButton from "../components/create-chat";

const ChatPage = () => {
  const { loading, chats, error } = useSelector((state) => state.conversation);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getChats());
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <>
      <CreateChatButton />
      {chats.map((conversation) => {
        return <div>{conversation.name}</div>;
      })}
      {chats.length === 0 && <div>No conversations</div>}
    </>
  );
};

export default ChatPage;
