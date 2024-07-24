import {
    Modal, ModalContent, ModalOverlay,
    Button, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
    Avatar, Box, Text, useToast
} from "@chakra-ui/react";
import { useDispatch } from 'react-redux';
// import { addToGroup, removefromGroup } from "../redux/reducers/chatSlice";

const ManageGroupUsers = ({ isOpen, onClose, chat }) => {
    const dispatch = useDispatch();
    const toast = useToast();

    const handleAddUser = async (userId) => {
        try {
            // await dispatch(addToGroup({ chatId: chat._id, userId }));
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
            // await dispatch(removefromGroup({ chatId: chat._id, userId }));
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
                                    </Box>
                                </Box>
                                <Button colorScheme="red"
                                    // onClick={() => handleRemoveUser(user._id)}
                                >Remove</Button>
                            </Box>
                        ))}
                    </Box>
                    <Box mt={4}>
                        <Text fontSize="lg" mb={4}>Add New Members</Text>
                        {/* Add functionality to search and add new users */}
                        {/* This can be a search input and a list of users to add */}
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