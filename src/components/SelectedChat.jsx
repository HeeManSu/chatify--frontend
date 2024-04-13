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
  const activeChat = useSelector((state) => state.chat.activeChat);
  const [content, setcontent] = useState("");
  // const [currentUser, setCurrentUser] = useState();
  const messages = useSelector((state) => state.message.messages)

  console.log("messages: ", messages);



  console.log("activeChat: ", activeChat);

  const handleBackButtonClick = () => {
    navigate("/chat");
  };

  const fetchMessages = async () => {
    await dispatch(fetchAllMessages({ chatId: activeChat?._id }))
  }

  useEffect(() => {
    fetchMessages();
  }, [activeChat])

  // useEffect(() => {
  //   const userFromLocalStorage = JSON.parse(localStorage.getItem("userInfo"));
  //   if (userFromLocalStorage) {
  //     setCurrentUser(userFromLocalStorage?.user);
  //   }
  // }, [])


  const typingHandler = (e) => {
    setcontent(e.target.value);
  }

  const sendMessage = async (event) => {
    if (event.key === 'Enter' && content) {
      event.preventDefault();

      const { payload } = await dispatch(sendMessages({ content, chatId: activeChat?._id }));
      console.log("chatMessage: ", payload?.chatMessage);

      dispatch(setMessages({
        messages: [...messages, payload?.chatMessage]
      }))

      setcontent("");
    }
  }

  return (
    <div>
      <div>
        <div className="border-red-400 border-2 flex items-center bg-blue-500 px-2 h-14" >
          <div className="pl-3">
            <AiOutlineArrowLeft className="text-white text-[21px]" onClick={handleBackButtonClick} />
          </div>
          <div className="flex justify-between w-full items-center pl-7" >
            <div className="flex gap-3 items-center">
              <div>
                <Avatar size="sm">
                  <AvatarBadge boxSize='1em' border='green' className="bg-red-400" />
                </Avatar>
              </div>
              <div className="text-white">
                Himanshu Sharma
              </div>
            </div>
            <div className=" pr-3">
              <BsThreeDotsVertical className="text-white" />
            </div>
          </div>
        </div>
        {
          loading ? (
            <Loader />
          ) : (
            <div className='bg-blue-50  mt-[5px]'>
              {/* <div className={` ${isTyping ? 'desktop:h-[74vh] 2xl:h-[72vh]  xl:h-[72vh] lg:h-[69vh] ' : 'desktop:h-[76vh] 2xl:h-[76vh] xl:h-[76vh]  lg:h-[69vh] h-[500px] '}  w-full hide-scrollbar`} > */}
              {
                allMessages && <ScrollableChat allMessages={allMessages} />
              }
              {/* </div> */}
            </div>
          )
        }
        <form onKeyDown={sendMessage}>
          <Input
            paddingY='5'
            placeholder='Enter the message'
            boxShadow='0px 4px 5px 2px rgba(121, 197, 239, 0.38)'
            onChange={typingHandler}
            value={content}
          />
        </form>
      </div>
    </div>
  )
}

export default SelectedChat