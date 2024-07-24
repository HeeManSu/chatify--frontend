import { FiMoreVertical, FiBell, FiPlusCircle } from "react-icons/fi";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Tabs, TabList, TabPanels, Tab, TabPanel, MenuGroup, MenuDivider,
  useDisclosure,
} from '@chakra-ui/react';
import CreatePersonChat from "../components/CreatePersonChat";
import CreateGroupChat from "../components/CreateGroupChat";
import PersonChat from "../components/PersonChat";
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage, logoutUser } from "../redux/reducers/userSlice";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import GroupChat from "../components/GroupChat";

const ChatPage = () => {
  const { isOpen: isPersonChatOpen, onOpen: onPersonChatOpen, onClose: onPersonChatClose } = useDisclosure();
  const { isOpen: isGroupChatOpen, onOpen: onGroupChatOpen, onClose: onGroupChatClose } = useDisclosure();
  const { message } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      dispatch(clearMessage());
    }
  }, [message, dispatch]);

  const logoutHandler = async () => {
    await dispatch(logoutUser());
    navigate("/");
    if (message) {
      // toast.success(message);
      dispatch(clearMessage());
    }
  };

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
                <MenuButton __css={{ backgroundColor: 'transparent' }} as={Button}>
                  <FiPlusCircle className="text-white text-2xl" />
                </MenuButton>
                <MenuList>
                  <MenuGroup fontWeight={"semibold"} title="Create New Chat">
                    <MenuDivider />
                    <MenuItem onClick={onPersonChatOpen}>Person Chat</MenuItem>
                    <CreatePersonChat onClose={onPersonChatClose} onOpen={onPersonChatOpen} isOpen={isPersonChatOpen} />
                    <MenuItem onClick={onGroupChatOpen}>Group Chat</MenuItem>
                    <CreateGroupChat onClose={onGroupChatClose} onOpen={onGroupChatOpen} isOpen={isGroupChatOpen} />
                  </MenuGroup>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton __css={{ backgroundColor: 'transparent' }} as={Button}>
                  <FiBell className="text-white text-2xl" />
                </MenuButton>
                <MenuList>
                  <MenuItem>Notification</MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton __css={{ backgroundColor: 'transparent' }} as={Button}>
                  <FiMoreVertical className="text-white text-2xl" />
                </MenuButton>
                <MenuList>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>
          <Tabs className="w-full">
            <TabList>
              <Tab width="50%" textColor="blue.100" _active={{}} _selected={{ borderBottomColor: 'blue.100', textColor: 'white', borderWidth: '3px' }}>
                Chats
              </Tab>
              <Tab width="50%" textColor="blue.100" _active={{}} _selected={{ borderBottomColor: 'blue.100', textColor: 'white', borderWidth: '3px' }}>
                Group Chats
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel padding={"0"} className="">
                <div>
                  <PersonChat />
                </div>
              </TabPanel>
              <TabPanel>
                <div><GroupChat /></div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;