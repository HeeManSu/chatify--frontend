import {
    Modal, ModalContent, ModalOverlay,

    Button,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Avatar,
} from "@chakra-ui/react"
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { resetUserState, searchUser } from "../redux/reducers/userSlice";
import { clearError, clearMessage, createPersonChat, } from "../redux/reducers/chatSlice";
import toast from "react-hot-toast";

const CreatePersonChat = ({ onClose, isOpen }) => {
    const [username, setUsername] = useState("");
    const [currentUser, setCurrentUser] = useState();
    const { users } = useSelector(state => state.user);
    const { message, chats } = useSelector(state => state.chat);
    const dispatch = useDispatch();

    const handleCloseModal = useCallback(() => {
        setUsername("");
        onClose();
    }, [setUsername, onClose]);

    const handleSearchClick = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            const newUserName = e.target.value;
            setUsername(newUserName);
            await dispatch(searchUser(newUserName));
            if (message) {
                dispatch(clearMessage());
            }
        } catch (error) {
            console.error("Error during user search:", error);
        }
    };


    useEffect(() => {
        if (message) {
            // toast.success(message);
            dispatch(clearMessage());
            handleCloseModal();
        }
        dispatch(resetUserState());
    }, [message, dispatch, handleCloseModal]);

    const accessChat = async (secondUserUsername) => {
        try {
            await dispatch(createPersonChat(secondUserUsername));
            if (message) {
                // toast.success(message);
                await dispatch(clearMessage());
                handleCloseModal();
            }
        } catch (error) {
            toast.error(error.message);
            dispatch(clearError())
        }
    }

    useEffect(() => {
        const userFromLocalStorage = JSON.parse(localStorage.getItem("userInfo"));
        if (userFromLocalStorage) {
            setCurrentUser(userFromLocalStorage?.user);
        }
    }, [])

    const getCurrentUserChatUsernames = (currentUserId, chats) => {
        const chatUsernames = new Set();
        chatUsernames.add(currentUser?._id);

        chats.forEach(chat => {
            chat.users.forEach(user => {
                if (user._id !== currentUserId) {
                    chatUsernames.add(user.username);
                }
            });
        });

        return Array.from(chatUsernames);
    };

    const existingChatUsernames = getCurrentUserChatUsernames(currentUser?._id, chats);
    const filteredUsers = users.filter(user => !existingChatUsernames.includes(user.username));

    return (
        <div>
            <Modal size='xl' isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent className="mx-6">
                    <ModalHeader>New person chat</ModalHeader>
                    <ModalCloseButton onClick={handleCloseModal} />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>
                                <Input
                                    required
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="Enter a username"
                                    value={username}
                                    onChange={handleSearchClick}
                                    autoFocus={true}
                                />
                            </FormLabel>
                        </FormControl>
                        <div className="flex flex-col h-fit pt-4">
                            {

                                filteredUsers && filteredUsers?.length > 0 && username.length > 0 && filteredUsers?.slice(0, 4).map((user, id) => (
                                    <button
                                        key={id}
                                        onClick={() => accessChat(user.username)}
                                        className="border pl-4 bg-white rounded-xl  flex shadow1 py-2"
                                    >
                                        {user.avatar && user.avatar.url ? (
                                            <Avatar size='md' src={user.avatar.url} alt={`Avatar of ${user.username}`} />
                                        ) : (
                                            <Avatar size='md' alt={`Avatar of ${user.username}`} />
                                        )}
                                        <div className="pl-5 text-start">
                                            <h1 className="text-black text-[17px]">{user.username}</h1>
                                            <h1 className="text-gray-500">{user.name}</h1>
                                        </div>
                                    </button>
                                ))
                            }
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleCloseModal} >
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default CreatePersonChat