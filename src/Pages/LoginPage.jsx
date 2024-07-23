/* eslint-disable react/no-unescaped-entities */
import { Button, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import wave from "../assets/wave.svg";
import linkedin from "../assets/linkedin.svg";
import twitter from "../assets/twitter.svg";
import discord from "../assets/discord.svg";
import github from "../assets/github.svg";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, loginUser } from "../redux/reducers/userSlice";
import { toast } from 'react-hot-toast';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.loading);
  const { message } = useSelector((state) => state.user);


  useEffect(() => {
    if (message) {
      dispatch(clearMessage());
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(loginUser({ username, password }));
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="w-full h-28 md:h-16 login-mobile-bg block lg:hidden">
        <div className="bg-blue-500 h-full -mb-1" />
        <img src={wave} className="" alt="wave" />
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
      <div className="h-full w-full lg:w-1/2 flex items-center justify-center">
        <div className="border-gray-200 shadow1 rounded-lg p-8 border w-auto lg:w-1/2">
          <h1 className="text-2xl pb-3 uppercase text-center font-semibold">
            Login
          </h1>
          <div>
            <form onSubmit={submitHandler}>
              <div className="flex flex-col gap-4">
                <div>
                  <label className=" text-sm font-semibold">Username</label>
                  <Input
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
                  <label className="text-sm font-semibold">Password</label>
                  <Input
                    required
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button
                  isLoading={isLoading}
                  _hover={{
                    backgroundColor: "blue.400",
                  }}
                  type="submit"
                  textColor={"white"}
                  backgroundColor={"blue.400"}
                >
                  Login
                </Button>
              </div>
            </form>
            <h1 className="text-start pt-2.5 cursor-pointer font-semibold">
              {" "}
              New user?{" "}
              <Link to="/register">
                {" "}
                <span className="text-blue-400  cursor-pointer hover:underline">
                  Register{" "}
                </span>{" "}
              </Link>
              here
            </h1>
          </div>
        </div>
      </div>
    </div>
    // <div className="w-full">
    //     <hr className="bg-blue-500 lg:hidden block h-[90px]" />
    //     <img className="lg:hidden block" src={wave} alt="" />
    //     <div className="flex items-center">
    //         <div className="backgroundimage lg:flex hidden flex-col w-[52%] h-[100vh] justify-between">
    //             <div className="text-white pl-10 pt-4 cursor-pointer font-[700] text-[24px]">
    //                 Chatify
    //             </div>
    //             <div className=" cursor-pointer tracking-wider text-white self-center mr-40 text-3xl font-semibold ">
    //                 Chatting Application
    //             </div>
    //             <div className="flex gap-6 py-5 self-center mr-52">
    //                 <img className='cursor-pointer' src={linkedin} alt="no_image" />
    //                 <img className='cursor-pointer' src={twitter} alt="no_image" />
    //                 <img className='cursor-pointer' src={discord} alt="no_image" />
    //                 <img className='cursor-pointer' src={github} alt="no_image" />
    //             </div>
    //         </div>
    //     </div>

    //     <div className="mx-auto mt-[120px] block">
    //         <div className="border-gray-200 shadow1 rounded-lg py-4  mx-auto max-w-[90%] mt-1 mb-5 border-[1px]">
    //             <h1 className='text-[24px] pb-3 uppercase text-center font-[600] text-black'>
    //                 Login
    //             </h1>
    //             <div className="px-8" >
    //                 <form onSubmit={submitHandler}>
    //                     <div className="flex flex-col gap-4">
    //                         <div>
    //                             <label className='pb-[6px] text-[15px] font-[600]'>Username</label>
    //                             <Input
    //                                 marginTop={"3px"}
    //                                 required
    //                                 id="username"
    //                                 name="username"
    //                                 type="text"
    //                                 placeholder="Enter your username"
    //                                 value={username}
    //                                 onChange={(e) => setUsername(e.target.value)}
    //                             />
    //                         </div>
    //                         <div>
    //                             <label className='pb-[6px] text-[15px] font-[600]'>Password</label>
    //                             <Input
    //                                 required
    //                                 marginTop={"3px"}
    //                                 id="password"
    //                                 name="password"
    //                                 type="password"
    //                                 placeholder="Enter your password"
    //                                 value={password}
    //                                 onChange={(e) => setPassword(e.target.value)}
    //                             />
    //                         </div>
    //                         <Button
    //                             _hover={{
    //                                 backgroundColor: 'blue.400'
    //                             }}
    //                             type='submit'
    //                             textColor={'white'}
    //                             backgroundColor={'blue.400'}
    //                             py={5}
    //                         >
    //                             Login
    //                         </Button>
    //                     </div>
    //                 </form>
    //                 <h1 className='text-[14px] text-start pt-[6px] cursor-pointer font-[600]' > New user? {" "}
    //                     <Link to='/register'> <span className='text-blue-400  cursor-pointer hover:underline'>Register {" "}</span> </Link>
    //                     here
    //                 </h1>
    //             </div>
    //         </div>
    //     </div>
    // </div>
  );
};
{
  /* <div className="w-full">
    <hr className="bg-blue-500 lg:hidden block h-[90px]" />
    <img className="lg:hidden block" src={wave} alt="" />
    <div className="flex items-center">
        <div className="backgroundimage lg:flex hidden flex-col w-[52%] h-[100vh] justify-between">
            <div className="text-white pl-10 pt-4 cursor-pointer font-[700] text-[24px]">
                Chatify
            </div>
            <div className=" cursor-pointer tracking-wider text-white self-center mr-40 text-3xl font-semibold ">
                Chatting Application
            </div>
            <div className="flex gap-6 py-5 self-center mr-52">
                <img className='cursor-pointer' src={linkedin} alt="no_image" />
                <img className='cursor-pointer' src={twitter} alt="no_image" />
                <img className='cursor-pointer' src={discord} alt="no_image" />
                <img className='cursor-pointer' src={github} alt="no_image" />
            </div>
        </div>
    </div>

    <div className="mx-auto mt-[120px] block">
        <div className="border-gray-200 shadow1 rounded-lg py-4  mx-auto max-w-[90%] mt-1 mb-5 border-[1px]">
            <h1 className='text-[24px] pb-3 uppercase text-center font-[600] text-black'>
                Login
            </h1>
            <div className="px-8" >
                <form onSubmit={submitHandler}>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className='pb-[6px] text-[15px] font-[600]'>Username</label>
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
                            <label className='pb-[6px] text-[15px] font-[600]'>Password</label>
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
                        <Button
                            _hover={{
                                backgroundColor: 'blue.400'
                            }}
                            type='submit'
                            textColor={'white'}
                            backgroundColor={'blue.400'}
                            py={5}
                        >
                            Login
                        </Button>
                    </div>
                </form>
                <h1 className='text-[14px] text-start pt-[6px] cursor-pointer font-[600]' > New user? {" "}
                    <Link to='/register'> <span className='text-blue-400  cursor-pointer hover:underline'>Register {" "}</span> </Link>
                    here
                </h1>
            </div>
        </div>
    </div>
</div> */
}

export default LoginPage;
