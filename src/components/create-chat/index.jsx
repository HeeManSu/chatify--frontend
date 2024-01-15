import { AddIcon } from "@chakra-ui/icons";
import { IconButton, useDisclosure } from "@chakra-ui/react";
import React from "react";
import CreateChatModal from "./create-chat-modal";

function CreateChatButton() {
  const personalChatDisclosure = useDisclosure();
  return (
    <>
      <IconButton
        colorScheme="blue"
        aria-label="Create chat"
        onClick={personalChatDisclosure.onOpen}
      >
        <AddIcon />
      </IconButton>

      <CreateChatModal
        isOpen={personalChatDisclosure.isOpen}
        onClose={personalChatDisclosure.onClose}
      />
    </>
  );
}

export default CreateChatButton;
