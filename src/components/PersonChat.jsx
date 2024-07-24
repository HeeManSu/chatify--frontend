import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllChats, updateActiveChat } from '../redux/reducers/chatSlice';
import Loader from './Loader';
import { Avatar } from '@chakra-ui/react';

const PersonChat = () => {
    const { loading, chats } = useSelector(state => state.chat);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllChats());
    }, [dispatch]);

    const personChats = chats.filter(chat => !chat.isGroupChat);

    const handleChatClick = (chat) => {
        dispatch(updateActiveChat({ activeChat: chat }));
        localStorage.setItem('activeChat', JSON.stringify(chat));
    };

    return (
        <div className="black m-0">
            {
                loading ? (
                    <Loader />
                ) : (
                    personChats.map((chat, id) => {
                        const isLastChat = id === personChats.length - 1;
                        const latestMessage = chat.latestMessage ? chat.latestMessage.content : "No messages yet";
                        return (
                            <div className='pl-2 py-1' key={id} onClick={() => handleChatClick(chat)}>
                                <Link to={`/chat/${chat._id}`}>
                                    <div className="flex justify-between">
                                        <div className="flex">
                                            {chat?.users[0]?.avatar?.url ? (
                                                <Avatar size={'md'} src={chat.users[1].avatar.url} />
                                            ) : (
                                                <Avatar size={'md'} alt={`Avatar of ${chat.username}`} />
                                            )}
                                            <div className="pl-[15px]">
                                                <h1 className="text-black text-[17px]">
                                                    {chat.users[1].name}
                                                </h1>
                                                <h1 className="text-green-600 font-semibold text-[15px]">
                                                    {latestMessage}
                                                </h1>
                                            </div>
                                        </div>
                                        {/* <div className="text-gray-600">
                                            5:30
                                        </div> */}
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
    );
};

export default PersonChat;