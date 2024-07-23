import {
    Modal, ModalContent, ModalOverlay,
    Button, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
    FormControl, FormLabel, Input, Avatar, Box, SkeletonCircle, SkeletonText,
    Checkbox, CheckboxGroup, Stack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from "../redux/reducers/userSlice";
import { clearMessage, createGroupChat } from "../redux/reducers/chatSlice";
import toast from "react-hot-toast";

const CreateGroupChat = ({ onClose, isOpen }) => {
    const [groupName, setGroupName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [avatar, setAvatar] = useState(null);
    const { users, loading } = useSelector(state => state.user);
    const { message } = useSelector(state => state.chat);
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        setGroupName("");
        setSelectedUsers([]);
        setAvatar(null);
        onClose();
    };

    const handleSearchClick = async (e) => {
        try {
            const newUserName = e.target.value;
            await dispatch(searchUser(newUserName));
            if (message) {
                dispatch(clearMessage());
            }
        } catch (error) {
            console.error("Error during user search:", error);
        }
    };

    const handleCreateGroupChat = async () => {
        if (selectedUsers.length < 2) {
            toast.error("Please select at least 2 users.");
            return;
        }
        const formData = new FormData();
        formData.append("name", groupName);
        formData.append("users", JSON.stringify(selectedUsers));
        formData.append("file", avatar);

        try {
            await dispatch(createGroupChat(formData));
            if (message) {
                toast.success(message);
                dispatch(clearMessage());
                handleCloseModal();
            }
        } catch (error) {
            toast.error(error.message || "Failed to create group chat");
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    };

    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch(clearMessage());
            handleCloseModal();
        }
    }, [message, dispatch]);

    return (
        <div>
            <Modal size='xl' isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent className="mx-6">
                    <ModalHeader>Create Group Chat</ModalHeader>
                    <ModalCloseButton onClick={handleCloseModal} />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Group Name</FormLabel>
                            <Input
                                required
                                id="groupName"
                                name="groupName"
                                type="text"
                                placeholder="Enter group name"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Search Users</FormLabel>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Enter a username"
                                onChange={handleSearchClick}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Group Avatar</FormLabel>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                            />
                        </FormControl>
                        <CheckboxGroup onChange={setSelectedUsers} value={selectedUsers}>
                            <Stack spacing={4} mt={4}>
                                {loading ? (
                                    <Box padding='6' boxShadow='lg' bg='white'>
                                        <SkeletonCircle size='10' />
                                        <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
                                    </Box>
                                ) : (
                                    users.map((user, id) => (
                                        <Checkbox key={id} value={user._id}>
                                            <div className="flex items-center">
                                                {user.avatar && user.avatar.url ? (
                                                    <Avatar size='md' src={user.avatar.url} alt={`Avatar of ${user.username}`} />
                                                ) : (
                                                    <Avatar size='md' alt={`Avatar of ${user.username}`} />
                                                )}
                                                <div className="pl-5 text-start">
                                                    <h1 className="text-black text-[17px]">{user.username}</h1>
                                                    <h1 className="text-gray-500">{user.name}</h1>
                                                </div>
                                            </div>
                                        </Checkbox>
                                    ))
                                )}
                            </Stack>
                        </CheckboxGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleCreateGroupChat}>
                            Create Group
                        </Button>
                        <Button onClick={handleCloseModal}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default CreateGroupChat;