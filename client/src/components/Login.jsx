import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import VerifyOtp from './VerifyOtp';

const Login = () => {

    const {setShowUserLogin, setUser, axios, navigate,state, setState} = useAppContext()

    const [regName, setRegName] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");

    const [logEmail, setLogEmail] = useState("");
    const [logPassword, setLogPassword] = useState("");

    const [nameError, setNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [isValid, setIsValid] = useState(true)

    const [otpSent, setOtpSent] = useState(false);

    const nameValidate = (nameValue) => {
        setIsValid(true)
        if(!nameValue) {
            setNameError("Name is required!");
            setIsValid(false)
        }else {
            setNameError("")
        }
    }

    const emailValidate = (emailValue) => {

        setIsValid(true)
        if(!emailValue) {
            setEmailError("Email is required!");
            setIsValid(false)
        } else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)){
            setEmailError("Invalid email format!")
            setIsValid(false)
        }else {
            setEmailError("")
        }
    }

    const passwordValidate = (passwordValue) => {
        setIsValid(true)
        if(!passwordValue) {
            setPasswordError("Password is required!");
            setIsValid(false)
        } else if(passwordValue.length < 8){
            setPasswordError("Password required min. 8 characters!");
            setIsValid(false)
        }else {
            setPasswordError("")
        }
    }

    const onSubmitHandler = async (event)=>{
        try {

            event.preventDefault();

            if(state === "register"){
                    const name = regName;
                    const email = regEmail;
                    const password = regPassword;
                

                if(isValid){
                    const {data} = await axios.post(`/api/user/register`,{name,email, password});
                    // console.log("ex"+data.success)
                    if (data.success){
                        // console.log("Otp send")
                        setOtpSent(true)
                    }else {
                        toast.error(data.message)
                    }
                } else {
                //   console.log("cheekc")


                }
            } else {

                    const {data} = await axios.post(`/api/user/login`,{
                         email:logEmail, password:logPassword
                    });

                    if (data.success){
                        navigate('/') 
                        setUser(data.user)
                        setShowUserLogin(false)
                        toast.success("Login Successfull")
                    }else {
                        toast.error(data.message)
                    }
                }

            } catch (error) {
            toast.error(error.message)
        }
        
       
        
    }

  return (
    
    
    
    <div onClick={()=> setShowUserLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50'>
      
     
      {otpSent ? (
        <VerifyOtp name={regName} email = {regEmail} password = {regPassword}/>
      ) :

      (<form onSubmit={onSubmitHandler} onClick={(e)=>e.stopPropagation()} className="relative flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
           <button onClick={()=> setShowUserLogin(false)} className=" cursor-pointer text-grey-100 text-xl absolute top-1 right-4 hover:text-primary">x</button>
            <p className="text-2xl font-medium m-auto">
                <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
            </p>
            {state === "register" ? (
                <div className='w-full'>
                    <div className="w-full mb-3">
                      <p>Name</p>
                      <input onChange={(e) => {setRegName(e.target.value); nameValidate(e.target.value)}} value={regName} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="text"  />
                      {nameError && (<p className='pl-1 text-xs text-red-400'>{nameError}</p>)}
                    </div>

                    <div className="w-full mb-3">
                      <p>Email</p>
                      <input onChange={(e) => {setRegEmail(e.target.value); emailValidate(e.target.value) }} value={regEmail} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="text" />
                      {emailError && (<p className='pl-1 text-xs text-red-400'>{emailError}</p>)}
                    </div>
                   
                    <div className="w-full mb-5">
                      <p>Password</p>
                      <input onChange={(e) => { setRegPassword(e.target.value); passwordValidate(e.target.value)}} value={regPassword} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="password" />
                      {passwordError && (<p className='pl-1 text-xs text-red-400'>{passwordError}</p>)}
                    </div>

                    <p>
                      Already have an account? <span onClick={() => setState("login")} className="text-primary cursor-pointer text-decoration-line: underline hover:text-primary-dull">login</span>
                    </p>
                </div>
            

                
            )
            : (

                <div className='w-full'>
                    <div className="w-full mb-3">
                      <p>Email</p>
                      <input onChange={(e) => setLogEmail(e.target.value)} value={logEmail} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="email" required />
                    </div>
                   
                    <div className="w-full mb-5">
                      <p>Password</p>
                      <input onChange={(e) => setLogPassword(e.target.value)} value={logPassword} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="password" required />
                    </div>

                    <p>
                    Create an account? <span onClick={() => setState("register")} className="text-primary cursor-pointer text-decoration-line: underline hover:text-primary-dull">register</span>
                </p>
                </div>
                
                
            )}

            <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
                {state === "register" ? "Create Account" : "Login"}
            </button>
        </form>)}
    </div>
  )
}

export default Login
