import {
    Modal, ModalContent, ModalOverlay,
    Button, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
    Avatar, Box, Text, useToast, Input, Stack
} from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addToGroup, removeFromGroup } from "../../redux/reducers/chatSlice";
import { searchUser } from "../../redux/reducers/userSlice";

const ManageGroupUsers = ({ isOpen, onClose, chat }) => {
    const dispatch = useDispatch();
    const toast = useToast();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const { loading } = useSelector(state => state.user);

    const handleAddUser = async (userId) => {
        try {
            await dispatch(addToGroup({ chatId: chat._id, userId }));
            toast({
                title: "User added to group.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Failed to add user.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleRemoveUser = async (userId) => {
        try {
            await dispatch(removeFromGroup({ chatId: chat._id, userId }));
            toast({
                title: "User removed from group.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Failed to remove user.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleSearch = async (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value.trim() === "") {
            setSearchResults([]);
            return;
        }
        try {
            const { payload } = await dispatch(searchUser(e.target.value));
            setSearchResults(payload);
        } catch (error) {
            console.error("Error during user search:", error);
        }
    };

    return (
        <Modal size='xl' isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent className="m-4 mt-3">
                <ModalHeader>Manage Group Users</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box>
                        <Text fontSize="lg" mb={4}>Group Members</Text>
                        {chat.users.map(user => (
                            <Box key={user._id} display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                                <Box display="flex" alignItems="center">
                                    <Avatar size='md' src={user.avatar?.url} alt={`Avatar of ${user.username}`} />
                                    <Box ml={3}>
                                        <Text fontSize="md">{user.username}</Text>
                                        <Text fontSize="sm" color="gray.500">{user.name}</Text>
                                        {chat.groupAdmin._id === user._id && (
                                            <Text fontSize="xs" color="blue.500">Admin</Text>
                                        )}
                                    </Box>
                                </Box>
                                {chat.groupAdmin._id !== user._id && (
                                    <Button colorScheme="red" onClick={() => handleRemoveUser(user._id)}>Remove</Button>
                                )}
                            </Box>
                        ))}
                    </Box>
                    <Box mt={4}>
                        <Text fontSize="lg" mb={4}>Add New Members</Text>
                        <Input
                            placeholder="Search users"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <Stack spacing={4} mt={4}>
                            {loading ? (
                                <Text>Loading...</Text>
                            ) : (
                                searchResults.map(user => (
                                    <Box key={user._id} display="flex" alignItems="center" justifyContent="space-between">
                                        <Box display="flex" alignItems="center">
                                            <Avatar size='md' src={user.avatar?.url} alt={`Avatar of ${user.username}`} />
                                            <Box ml={3}>
                                                <Text fontSize="md">{user.username}</Text>
                                                <Text fontSize="sm" color="gray.500">{user.name}</Text>
                                            </Box>
                                        </Box>
                                        <Button colorScheme="blue" onClick={() => handleAddUser(user._id)}>Add</Button>
                                    </Box>
                                ))
                            )}
                        </Stack>
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ManageGroupUsers;