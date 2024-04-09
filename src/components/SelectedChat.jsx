import { Avatar, AvatarBadge } from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import ScrollableChat from "./ScrollableChat";
import { useEffect } from 'react';
import { fetchAllMessages } from "../redux/reducers/messageSlice";
const SelectedChat = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, allMessages } = useSelector(state => state?.message);
  const activeChat = useSelector((state) => state.chat.activeChat);


  console.log("activeChat: ", activeChat);

  const handleBackButtonClick = () => {
    navigate("/chat");
  };

  const fetchMessages = async () => {
    const { payload } = await dispatch(fetchAllMessages({ chatId: activeChat?._id }))
    console.log("allMessages:", payload);
  }

  useEffect(() => {
    fetchMessages();
  }, [activeChat])

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
                allMessages && <ScrollableChat />
              }
              {/* </div> */}
            </div>
          )
        }
      </div>
    </div>
  )
}

export default SelectedChat