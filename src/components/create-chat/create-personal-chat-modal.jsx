import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  FormControl,
  FormLabel,
  Card,
  CardBody,
  Avatar,
  Text,
} from "@chakra-ui/react";
import useDebounce from "../../hooks/use-debounce";
import { createPersonChatService } from "../../services/chat";
import { searchUsers } from "../../services/users";
import { useQuery } from "@tanstack/react-query";
function CreatePersonalChatModal({ isOpen, onClose }) {
  const [username, setUsername] = useState("");
  const [selectedUser, setSelectedUser] = useState(null); // [1]
  const debouncedUsername = useDebounce(username, 300);
  const { data: response, isLoading } = useQuery({
    queryKey: ["personal-chat-users", debouncedUsername],
    queryFn: () => searchUsers(debouncedUsername),
    enabled: username.length > 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const users = response?.data?.users;
  console.log(selectedUser);
  const handleStartChat = () => {
    createPersonChatService(debouncedUsername);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Personal Chat</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Search for users</FormLabel>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Card size="sm" variant="outline" borderTop={0}>
              <CardBody>
                {selectedUser === null && (
                  <>
                    {isLoading && <div>Loading...</div>}
                    {users?.map((user) => (
                      <div
                        onClick={() => setSelectedUser(user)}
                        key={user._id}
                        className="flex gap-2 items-center border-b p-2 rounded cursor-pointer hover:bg-transparent/5 last:border-b-0"
                      >
                        <Avatar src={user.avatar?.url} name={user.name} />
                        <Text>{user.name}</Text>
                      </div>
                    ))}
                  </>
                )}
                {!!selectedUser && (
                  <div className="flex gap-2 items-center border-b p-2 rounded cursor-pointer hover:bg-transparent/5 last:border-b-0">
                    <Avatar
                      src={selectedUser.avatar?.url}
                      name={selectedUser.name}
                    />
                    <Text>{selectedUser.name}</Text>
                  </div>
                )}
              </CardBody>
            </Card>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue">Start</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CreatePersonalChatModal;
