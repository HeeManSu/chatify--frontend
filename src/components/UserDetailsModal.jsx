import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Avatar, Text, Box } from "@chakra-ui/react";

const UserDetailsModal = ({ isOpen, onClose, user }) => {
    return (
        <Modal size='md' isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent mt={120} className="m-4">
                <ModalHeader>User Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Avatar size="xl" src={user?.avatar?.url} mb={4} />
                        <Text fontSize="2xl" fontWeight="bold">{user?.username}</Text>
                        <Text fontSize="md" color="gray.500" mt={2}>{user?.name}</Text>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default UserDetailsModal;