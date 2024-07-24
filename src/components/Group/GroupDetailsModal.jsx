import {
    Modal, ModalContent, ModalOverlay,
    ModalHeader, ModalCloseButton, ModalBody,
    Avatar, Box, Text, FormControl, FormLabel, Input, Button
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { renameGroup, updateActiveChat } from "../../redux/reducers/chatSlice";

const GroupDetailsModal = ({ isOpen, onClose, chat }) => {
    const [newGroupName, setNewGroupName] = useState(chat?.chatName || "");
    const dispatch = useDispatch();
    const { activeChat } = useSelector(state => state?.chat);
    console.log(activeChat);

    const handleRenameGroup = async () => {
        if (newGroupName.trim() === "") return;
        const { payload } = await dispatch(renameGroup({ chatId: chat._id, newName: newGroupName }));
        console.log(payload);

        const updatedChat = updatedActiveChat(activeChat, payload);
        dispatch(updateActiveChat({ activeChat: updatedChat }));

        localStorage.setItem('activeChat', JSON.stringify(updatedChat));

        onClose();
    };

    console.log(localStorage.getItem('activeChat'));

    const updatedActiveChat = (activeChat, payload) => {
        if (payload && activeChat && payload._id === activeChat._id) {
            activeChat.chatName = payload.chatName;
        }
        console.log(activeChat);
        return activeChat;
    };


    return (
        <Modal size='md' isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent mt={120} className="m-4">
                <ModalHeader>Group Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Avatar size="xl" src={chat?.avatar?.url} mb={4} />
                        <Text fontSize="2xl" fontWeight="bold">{chat?.chatName}</Text>

                        <Text fontSize="md" color="gray.500" mt={2}>
                            Members: {chat?.users.map(user => user.username).join(', ')}
                        </Text>
                        <FormControl mt={4}>
                            <FormLabel>Rename Group</FormLabel>
                            <Input
                                value={newGroupName}
                                onChange={(e) => setNewGroupName(e.target.value)}
                                placeholder="Enter new group name"
                            />
                        </FormControl>
                        <Button mt={4} colorScheme="blue" onClick={handleRenameGroup}>
                            Rename Group
                        </Button>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default GroupDetailsModal;