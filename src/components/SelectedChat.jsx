import { Avatar, AvatarBadge, Input } from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import ScrollableChat from "./ScrollableChat";
import { useEffect, useState } from 'react';
import { fetchAllMessages, sendMessages, setMessages } from "../redux/reducers/messageSlice";

const SelectedChat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, allMessages } = useSelector(state => state?.message);
  const [content, setContent] = useState("");
  const messages = useSelector((state) => state.message.messages);

  const handleBackButtonClick = () => {
    navigate("/chat");
  };

  const activeChat = JSON.parse(localStorage.getItem('activeChat'));


  const fetchMessages = async () => {
    if (activeChat?._id) {
      const output = await dispatch(fetchAllMessages({ chatId: activeChat?._id }));
      console.log(output);
    }
  };

  useEffect(() => {
    fetchMessages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChat?._id, dispatch]);

  const typingHandler = (e) => {
    setContent(e.target.value);
  };

  const sendMessage = async (event) => {
    if (event.key === 'Enter' && content) {
      event.preventDefault();
      const { payload } = await dispatch(sendMessages({ content, chatId: activeChat?._id }));
      dispatch(setMessages({ messages: [...messages, payload?.chatMessage] }));
      setContent("");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="border-red-400 border-2 flex items-center bg-blue-500 px-2 h-14">
        <div className="pl-3">
          <AiOutlineArrowLeft className="text-white text-[21px]" onClick={handleBackButtonClick} />
        </div>
        <div className="flex justify-between w-full items-center pl-7">
          <div className="flex gap-3 items-center">
            <Avatar size="sm" src={activeChat.users[1].avatar.url}>
              <AvatarBadge boxSize='1em' border='green' className="bg-green-500" />
            </Avatar>
            <div className="text-white">
              {activeChat?.chatName}
            </div>
          </div>
          <BsThreeDotsVertical className="text-white text-[23px] mr-2" />
        </div>
      </div>
      <div className="flex-1 bg-blue-50 mt-[5px] overflow-y-auto">
        {loading ? <Loader /> : <ScrollableChat allMessages={allMessages} />}
      </div>
      <form onKeyDown={sendMessage} className="p-2">
        <Input
          paddingY='5'
          placeholder='Enter the message'
          boxShadow='0px 4px 5px 2px rgba(121, 197, 239, 0.38)'
          onChange={typingHandler}
          value={content}
        />
      </form>
    </div>
  );
};

export default SelectedChat;
