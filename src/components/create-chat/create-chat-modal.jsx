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
  Badge,
} from "@chakra-ui/react";
import useDebounce from "../../hooks/use-debounce";
import {
  createGroupChatService,
  createPersonChatService,
} from "../../services/chat";
import { searchUsers } from "../../services/users";
import { useMutation, useQuery } from "@tanstack/react-query";
import { cn } from "../../utils/cn";
function CreateChatModal({ isOpen, onClose }) {
  const [username, setUsername] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]); // [1]

  const personalChatMutation = useMutation({
    mutationFn: createPersonChatService,
    onSuccess: (data) => {
      onClose();
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
  const groupChatMutation = useMutation({
    mutationFn: createGroupChatService,
    onSuccess: (data) => {
      onClose();
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
  const debouncedUsername = useDebounce(username, 300);
  const { data: response, isLoading } = useQuery({
    queryKey: ["personal-chat-users", debouncedUsername],
    queryFn: () => {
      console.log("debouncedUsername", debouncedUsername);
      return searchUsers({
        search: debouncedUsername,
      });
    },
    enabled: debouncedUsername.length > 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const users = response?.data?.users;
  const handleStartChat = () => {
    const isGroupChat = selectedUsers.length > 1;
    if (isGroupChat) {
      groupChatMutation.mutate({
        userIds: selectedUsers.map((u) => u._id),
      });
      return;
    }
    const user = selectedUsers[0];
    personalChatMutation.mutate({
      targetId: user._id,
    });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Chat</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div>
            {selectedUsers?.map((user) => (
              <Badge
                key={user._id}
                variant="outline"
                colorScheme="blue"
                rounded={20}
                mr={2}
                mb={2}
              >
                <div className="flex items-center p-1">
                  <Avatar
                    size="xs"
                    src={user.avatar?.url}
                    name={user.name}
                    mr={2}
                  />
                  {user.name}
                </div>
              </Badge>
            ))}
          </div>
          <FormControl>
            <FormLabel>Search for users</FormLabel>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Card size="sm" variant="outline" borderTop={0}>
              <CardBody>
                {isLoading && <div>Loading...</div>}
                {users?.map((user) => {
                  const isSelected = selectedUsers.find(
                    (u) => u._id === user._id
                  );
                  return (
                    <div
                      onClick={() => {
                        if (isSelected) {
                          setSelectedUsers((prev) =>
                            prev.filter((u) => u._id !== user._id)
                          );
                          return;
                        }
                        setSelectedUsers((prev) => [...prev, user]);
                      }}
                      key={user._id}
                      className={cn(
                        "flex gap-2 items-center",
                        "border-b p-2 rounded cursor-pointer last:border-b-0",
                        "hover:bg-transparent/5",
                        {
                          "bg-transparent/5": isSelected,
                        }
                      )}
                    >
                      <Avatar src={user.avatar?.url} name={user.name} />
                      <Text>{user.name}</Text>
                    </div>
                  );
                })}

                {/* {!!selectedUsers && (
                  <div className="flex gap-2 items-center border-b p-2 rounded cursor-pointer hover:bg-transparent/5 last:border-b-0">
                    <Avatar
                      src={selectedUser.avatar?.url}
                      name={selectedUser.name}
                    />
                    <Text>{selectedUser.name}</Text>
                  </div>
                )} */}
              </CardBody>
            </Card>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={handleStartChat}
            isLoading={
              personalChatMutation.isLoading || groupChatMutation.isLoading
            }
          >
            Start
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CreateChatModal;
