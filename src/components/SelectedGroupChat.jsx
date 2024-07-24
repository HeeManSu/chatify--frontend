import { Avatar, AvatarBadge, Input, Text, useDisclosure, Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import ScrollableChat from "./ScrollableChat";
import { useEffect, useState } from 'react';
import { fetchAllMessages, sendMessages, setMessages } from "../redux/reducers/messageSlice";
import GroupDetailsModal from "./Group/GroupDetailsModal";
import ManageGroupUsers from "./Group/ManageGroupUsers";

const SelectedGroupChat = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, allMessages } = useSelector(state => state?.message);
    const [content, setContent] = useState("");
    const messages = useSelector((state) => state.message.messages);
    const { isOpen: isDetailsOpen, onOpen: onDetailsOpen, onClose: onDetailsClose } = useDisclosure();
    const { isOpen: isManageOpen, onOpen: onManageOpen, onClose: onManageClose } = useDisclosure();

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

    console.log(activeChat);

    useEffect(() => {
        fetchMessages();
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

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };


    return (
        <div className="flex flex-col h-screen">
            <div className="border-red-400 border-2 flex items-center bg-blue-500 px-2 h-14">
                <div className="pl-3">
                    <AiOutlineArrowLeft className="text-white text-[21px]" onClick={handleBackButtonClick} />
                </div>
                <div className="flex justify-between w-full items-center pl-7">
                    <div className="flex gap-3 items-center" onClick={onDetailsOpen} style={{ cursor: 'pointer' }}>
                        <Avatar size="sm" src={activeChat?.avatar?.url}>
                            <AvatarBadge boxSize='1em' border='green' className="bg-green-500" />
                        </Avatar>
                        <div className="text-white">
                            {activeChat?.chatName}
                            <Text fontSize="xs" color="gray.300">
                                {truncateText(activeChat?.users.map(user => user.username).join(', '), 20)}
                            </Text>
                        </div>
                    </div>
                    <Menu>
                        <MenuButton as={Button} background="transparent">
                            <BsThreeDotsVertical className="text-white text-[23px] mr-2" />
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={onManageOpen}>Manage Group</MenuItem>
                        </MenuList>
                    </Menu>
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
            {activeChat && (
                <>
                    <GroupDetailsModal isOpen={isDetailsOpen} onClose={onDetailsClose} chat={activeChat} />
                    <ManageGroupUsers isOpen={isManageOpen} onClose={onManageClose} chat={activeChat} />
                </>
            )}
        </div>
    );
};

export default SelectedGroupChat;