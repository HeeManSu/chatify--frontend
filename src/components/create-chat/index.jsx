import { AddIcon } from "@chakra-ui/icons";
import {
  Popover,
  PopoverTrigger,
  IconButton,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import CreatePersonalChatModal from "./create-personal-chat-modal";

function CreateChatButton() {
  const personalChatDisclosure = useDisclosure();
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <IconButton colorScheme="blue">
            <AddIcon />
          </IconButton>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <div className="flex flex-col gap-2">
              <Button colorScheme="blue" onClick={personalChatDisclosure.onOpen}>
                Create Chat
              </Button>
              <Button colorScheme="blue" variant="outline">
                Create Group
              </Button>
            </div>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <CreatePersonalChatModal
        isOpen={personalChatDisclosure.isOpen}
        onClose={personalChatDisclosure.onClose}
      />
    </>
  );
}

export default CreateChatButton;
