import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearMessage, fetchAllChats, updateActiveChat } from "../redux/reducers/chatSlice";
// import { Card, CardBody } from "@chakra-ui/react";
import Loader from "./Loader";
import { Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";


const PersonChat = () => {

    const { loading, chats, message } = useSelector(state => state.chat);

    console.log(chats)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllChats());
        if (message) {
            dispatch(clearMessage());
        }
    }, []);

    return (
        <div className="border-2 border-black m-0">
            {
                loading ? (
                    <Loader />
                ) : (
                    chats?.map((chat, id) => {
                        const isLastChat = id === chats.length - 1;
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

export default PersonChat