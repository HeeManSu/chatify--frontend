import { FiMoreVertical } from "react-icons/fi";
import { FiBell } from "react-icons/fi";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Tabs, TabList, TabPanels, Tab, TabPanel, MenuGroup, MenuDivider,
  useDisclosure,
} from '@chakra-ui/react'
import { FiPlusCircle } from "react-icons/fi";
import CreatePersonChat from "../components/CreatePersonChat";
import PersonChat from "../components/PersonChat";
// import PersonChat from "../components/PersonChat";

const ChatPage = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="h-full w-full">
      <div>
        <div className="h-[107px] bg-blue-500 ">
          <div className="py-4 flex justify-between items-center px-4">
            <div>
              <h1 className="text-white font-semibold text-2xl cursor-default">
                Chatify
              </h1>
            </div>
            <div className="flex gap-5">
              <Menu>
                <MenuButton __css={{
                  "backgroundColor": 'transparent',
                }} as={Button}>
                  <FiPlusCircle className="text-white text-2xl" />
                </MenuButton>
                <MenuList>
                  <MenuGroup fontWeight={"semibold"} title="Create New Chat">
                    <MenuDivider />
                    <MenuItem onClick={onOpen}>Person Chat</MenuItem>
                    <CreatePersonChat onClose={onClose} onOpen={onOpen} isOpen={isOpen} />
                    <MenuItem> Group Chat</MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton __css={{
                  "backgroundColor": 'transparent',
                }} as={Button}>
                  <FiBell className="text-white text-2xl" />
                </MenuButton>
                <MenuList>
                  <MenuItem>Notification</MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton __css={{
                  "backgroundColor": 'transparent',
                }} as={Button}>
                  <FiMoreVertical className="text-white text-2xl" />
                </MenuButton>
                <MenuList>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>
          <Tabs className="w-full">
            <TabList >
              <Tab width="50%" textColor="blue.100" _active={{}} _selected={{
                borderBottomColor: 'blue.100', textColor: 'white', borderWidth: '3px'
              }}>
                Chats
              </Tab>
              <Tab width="50%" textColor="blue.100" _active={{}} _selected={{
                borderBottomColor: 'blue.100', textColor: 'white', borderWidth: '3px'
              }}>
                Group Chats
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel padding={"0"} className="border-2 border-red-600">
                <div>
                  <PersonChat />
                </div>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
