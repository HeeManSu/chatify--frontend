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
    Box,
    SkeletonCircle,
    SkeletonText,
} from "@chakra-ui/react"
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from "../redux/reducers/userSlice";
import { clearError, clearMessage, createPersonChat, } from "../redux/reducers/chatSlice";
import toast from "react-hot-toast";

const CreatePersonChat = ({ onClose, isOpen, onOpen }) => {
    const [username, setUsername] = useState("");

    const { users, loading } = useSelector(state => state.user);
    const { message } = useSelector(state => state.chat);

    const dispatch = useDispatch();

    const handleCloseModal = () => {
        setUsername("");
        onClose();
    }

    const handleSearchClick = (e) => {
        const newUserName = e.target.value;
        setUsername(newUserName)
        dispatch(searchUser(newUserName))
    }

    const accessChat = async (secondUserUsername) => {
        try {
            await dispatch(createPersonChat(secondUserUsername));
            if (message) {
                toast.success(message);
                dispatch(clearMessage());
            }
        } catch (error) {
            toast.error(error.message);
            dispatch(clearError())
        }
    }


    return (
        <div>
            <Modal size='xl' isOpen={isOpen} onClose={onOpen}>
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
                                />
                            </FormLabel>
                        </FormControl>
                        <div className="flex flex-col pt-4">
                            {loading ? (
                                <Box padding='6' boxShadow='lg' bg='white'>
                                    <SkeletonCircle size='10' />
                                    <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
                                </Box>
                            ) : (
                                users && users?.length > 0 && username.length > 0 && users?.slice(0, 4).map((user, id) => (
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
                            )
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