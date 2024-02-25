import { FiMoreVertical } from "react-icons/fi";
// import { FiSearch } from "react-icons/fi";
import { FiBell } from "react-icons/fi";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Tabs, TabList, TabPanels, Tab, TabPanel, MenuGroup, MenuDivider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  // FormErrorMessage,
  // FormHelperText,
  Input,
  Avatar,
  Box,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react'
import { FiPlusCircle } from "react-icons/fi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../redux/reducers/userSlice";
import { clearError, clearMessage, createPersonChat } from "../redux/reducers/chatSlice";
import toast from "react-hot-toast";


const ChatPage = () => {

  const { users, loading } = useSelector(state => state.user);
  const { chat, message, error } = useSelector(state => state.chat);

  console.log("chat", chat);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const handleSearchClick = (e) => {
    const newUserName = e.target.value;
    setUsername(newUserName)
    dispatch(searchUser(newUserName))
  }

  const handleCloseModal = () => {
    setUsername("");
    onClose();
  }

  const accessChat = (id) => {
    dispatch(createPersonChat(id));
    if (error) {
      toast.error(error);
      dispatch(clearError())
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }

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
                    <Modal size='xl' isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent className="mx-6">
                        <ModalHeader>New person chat</ModalHeader>
                        <ModalCloseButton onClick={handleCloseModal} />
                        <ModalBody>
                          <FormControl>
                            <FormLabel>
                              <Input
                                required
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Enter a username"
                                value={username}
                                onChange={handleSearchClick}
                              />
                            </FormLabel>
                          </FormControl>
                          <div className="flex flex-col pt-4">
                            {loading ? (
                              <Box padding='6' boxShadow='lg' bg='white'>
                                <SkeletonCircle size='10' />
                                <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
                              </Box>
                            ) : (
                              users && users?.length > 0 && username.length > 0 && users?.slice(0, 4).map((user, id) => (
                                <button
                                  key={id}
                                  onClick={() => accessChat(user._id)}
                                  className="border pl-4 bg-white rounded-xl  flex shadow1 py-2"
                                >
                                  {user.avatar && user.avatar.url ? (
                                    <Avatar size='md' src={user.avatar.url} alt={`Avatar of ${user.username}`} />
                                  ) : (
                                    <Avatar size='md' alt={`Avatar of ${user.username}`} />
                                  )}
                                  <div className="pl-5 text-start">
                                    <h1 className="text-black text-[17px]">{user.username}</h1>
                                    <h1 className="text-gray-500">{user.name}</h1>
                                  </div>
                                </button>
                              ))
                            )
                            }
                          </div>
                        </ModalBody>
                        <ModalFooter>
                          <Button colorScheme='blue' mr={3} onClick={handleCloseModal} >
                            Close
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
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
              <TabPanel>
                <p>one!</p>
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
