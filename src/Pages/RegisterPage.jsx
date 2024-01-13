import { Avatar, Button, Input } from "@chakra-ui/react"
import { useState } from "react"
import { Link } from "react-router-dom"
import wave from "../assets/wave.svg"
import linkedin from "../assets/linkedin.svg"
import twitter from "../assets/twitter.svg"
import discord from "../assets/discord.svg"
import github from "../assets/github.svg"
import { useDispatch } from "react-redux"
import { registerUser } from "../redux/reducers/userSlice"

const RegisterPage = () => {

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState();


  const dispatch = useDispatch();


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
  }

  return (
    <div className="w-full">
      <hr className="bg-blue-500 block lg:hidden h-[60px]" />
      <img className="lg:hidden block" src={wave} alt="" />


      <div className="flex items-center">
        <div className="backgroundimage lg:block hidden  w-[52%] h-[100vh] ">
          <div className="text-white pl-24 pt-[18px] cursor-pointer font-[700] text-[24px]">
            Chatify
          </div>
          <div className=" cursor-pointer tracking-wider text-white text-[28px] pl-[310px] font-[600] mt-[200px]">
            Chatting Application
          </div>
          <div className="flex pl-36 pt-60 gap-6 ml-[170px]">
            <img className='cursor-pointer' src={linkedin} alt="no_image" />
            <img className='cursor-pointer' src={twitter} alt="no_image" />
            <img className='cursor-pointer' src={discord} alt="no_image" />
            <img className='cursor-pointer' src={github} alt="no_image" />
          </div>
        </div>

        <div className="lg:block hidden mx-auto">
          <div className="border-gray-200   shadow1 rounded-lg py-4  mt-1 border-[1px]">
            <h1 className='text-[24px] pb-3 uppercase text-center font-[600] text-black'>
              Registration
            </h1>
            <div className="px-8" >
              <form onSubmit={submitHandler}>
                <div className="flex flex-col gap-4">
                  <div className="mx-auto">
                    <Avatar src={image && URL.createObjectURL(image)} size={'xl'} />
                  </div>
                  <div>
                    <label className='pb-[6px] text-[15px] font-[600]'>Name</label>
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
                    <label className='pb-[6px] text-[15px] font-[600]'>Email</label>
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
                  <div>
                    <h1 className='pb-[6px] text-[15px] font-[600]'>Choose Avatar</h1>
                    <Input
                      marginTop={"3px"}
                      accept='image/*'
                      required
                      id='choose avatar'
                      type='file'
                      onChange={changeImageHandler}
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
                    Register
                  </Button>
                </div>
              </form>
              <h1 className='text-[14px] text-start pt-[6px] cursor-pointer font-[600]' >Already a User? {" "}
                <Link to='/'> <span className='text-blue-400  cursor-pointer hover:underline'>Login {" "}</span> </Link>
                here
              </h1>
            </div>
          </div>
        </div>
      </div>


      {/* <div className="mx-auto lg:hidden block">
        <div className="border-gray-200 shadow1 rounded-lg py-4  mx-auto max-w-[90%] mt-1 mb-5 border-[1px]">
          <h1 className='text-[24px] pb-3 uppercase text-center font-[600] text-black'>
            Registration
          </h1>
          <div className="px-8" >
            <form onSubmit={submitHandler}>
              <div className="flex flex-col gap-4">
                <div className="mx-auto">
                  <Avatar src={image && URL.createObjectURL(image)} size={'xl'} />
                </div>
                <div>
                  <label className='pb-[6px] text-[15px] font-[600]'>Name</label>
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
                  <label className='pb-[6px] text-[15px] font-[600]'>Email</label>
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
                <div>
                  <h1 className='pb-[6px] text-[15px] font-[600]'>Choose Avatar</h1>
                  <Input
                    marginTop={"3px"}
                    accept='image/*'
                    required
                    id='choose avatar'
                    type='file'
                  onChange={changeImageHandler}
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
                  Register
                </Button>
              </div>
            </form>
            <h1 className='text-[14px] text-start pt-[6px] cursor-pointer font-[600]' >Already a User? {" "}
              <Link to='/'> <span className='text-blue-400  cursor-pointer hover:underline'>Login {" "}</span> </Link>
              here
            </h1>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default RegisterPage
