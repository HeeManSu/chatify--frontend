import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, fetchAllChats, updateActiveChat } from "../redux/reducers/chatSlice";
import Loader from "./Loader";
import { Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const GroupChat = () => {
    const { loading, chats, message } = useSelector(state => state.chat);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllChats());
    }, [dispatch]);

    useEffect(() => {
        if (message) {
            dispatch(clearMessage());
        }
    }, [dispatch, message]);

    const groupChats = chats.filter(chat => chat.isGroupChat);

    // Reverse the 'groupChats' array before mapping
    const reversedChats = [...groupChats].reverse();

    return (
        <div className=" m-0">
            {
                loading ? (
                    <Loader />
                ) : (
                    reversedChats.map((chat, id) => {
                        const isLastChat = id === reversedChats.length - 1;
                        return (
                            <div key={id} onClick={() => dispatch(updateActiveChat({ activeChat: chat }))}>
                                <Link to={`/chat/${chat._id}`}>
                                    <div className="flex justify-between">
                                        <div className="flex">
                                            {chat?.users[0]?.avatar?.url ? (
                                                <Avatar size={'md'} src={chat.users[0].avatar.url} />
                                            ) : (
                                                <Avatar size={'md'} alt={`Avatar of ${chat.username}`} />
                                            )}
                                            <div className="pl-[15px]">
                                                <h1 className="text-black text-[17px]">
                                                    {chat.chatName}
                                                </h1>
                                                <h1>new messages</h1>
                                            </div>
                                        </div>
                                        <div className="text-gray-600">
                                            5:30
                                        </div>
                                    </div>
                                    {
                                        !isLastChat && <div className="border-gray-300 max-w-[98%] mx-auto border my-[8px]">
                                        </div>
                                    }
                                </Link>
                            </div>
                        )
                    })
                )
            }
        </div>
    )
}

export default GroupChat;