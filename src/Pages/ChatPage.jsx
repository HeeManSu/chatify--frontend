import { useEffect } from "react";
import { getConversations } from "../redux/reducers/conversation-slice";
import { useSelector } from "react-redux";

const ChatPage = () => {
  const { loading, conversations, error } = useSelector(
    (state) => state.conversation
  );
  useEffect(() => {
    getConversations();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <>
      {conversations.map((conversation) => {
        return <div>{conversation.name}</div>;
      })}
      {conversations.length === 0 && <div>No conversations</div>}
    </>
  );
};

export default ChatPage;
