import { Avatar, Button, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import wave from "../assets/wave.svg";
import linkedin from "../assets/linkedin.svg";
import twitter from "../assets/twitter.svg";
import discord from "../assets/discord.svg";
import github from "../assets/github.svg";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, registerUser } from "../redux/reducers/userSlice";


const RegisterPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState();
  const { message } = useSelector((state) => state.user);


  const dispatch = useDispatch();


  useEffect(() => {
    if (message) {
      dispatch(clearMessage());
    }
  }, []);


  const submitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("username", username);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("file", image);
    dispatch(registerUser(myForm));
  };

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="w-full h-28 md:h-16 login-mobile-bg block lg:hidden">
        <div className="bg-blue-500 h-full -mb-1" />
        <img src={wave} alt="no_image" />
      </div>
      <div className="backgroundimage w-1/2 hidden lg:flex justify-between flex-col">
        <div className="p-5">
          <h1 className="text-white font-bold text-2xl cursor-default">
            Chatify
          </h1>
        </div>
        <div className=" cursor-pointer tracking-wider text-white self-center mr-40 text-3xl font-medium ">
          Chatting Application
        </div>
        <div className="flex gap-6 py-5 self-center mr-52">
          <img className="cursor-pointer" src={linkedin} alt="no_image" />
          <img className="cursor-pointer" src={twitter} alt="no_image" />
          <img className="cursor-pointer" src={discord} alt="no_image" />
          <img className="cursor-pointer" src={github} alt="no_image" />
        </div>
      </div>
      <div className="h-full w-full lg:w-1/2 mt-20 lg:mt-0 overflow-auto flex items-center justify-center">
        <div className="border-gray-200   shadow1 rounded-lg py-4  mt-1 border-[1px]">
          <h1 className="text-[24px] pb-3 uppercase text-center font-[600] text-black">
            Registration
          </h1>
          <div className="px-8">
            <form onSubmit={submitHandler}>
              <div className="flex flex-col gap-4">
                <div className="mx-auto">
                  <Avatar
                    src={image && URL.createObjectURL(image)}
                    size={"xl"}
                  />
                </div>
                <div>
                  <label className="pb-[6px] text-[15px] font-[600]">
                    Name
                  </label>
                  <Input
                    marginTop={"3px"}
                    required
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="pb-[6px] text-[15px] font-[600]">
                    Username
                  </label>
                  <Input
                    marginTop={"3px"}
                    required
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label className="pb-[6px] text-[15px] font-[600]">
                    Email
                  </label>
                  <Input
                    marginTop={"3px"}
                    required
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="pb-[6px] text-[15px] font-[600]">
                    Password
                  </label>
                  <Input
                    required
                    marginTop={"3px"}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <h1 className="pb-[6px] text-[15px] font-[600]">
                    Choose Avatar
                  </h1>
                  <Input
                    marginTop={"3px"}
                    accept="image/*"
                    required
                    id="choose avatar"
                    type="file"
                    onChange={changeImageHandler}
                  />
                </div>
                <Button
                  _hover={{
                    backgroundColor: "blue.400",
                  }}
                  type="submit"
                  textColor={"white"}
                  backgroundColor={"blue.400"}
                  py={5}
                >
                  Register
                </Button>
              </div>
            </form>
            <h1 className="text-[14px] text-start pt-[6px] cursor-pointer font-[600]">
              Already a User?{" "}
              <Link to="/">
                {" "}
                <span className="text-blue-400  cursor-pointer hover:underline">
                  Login{" "}
                </span>{" "}
              </Link>
              here
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
