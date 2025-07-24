import {useState} from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const VerifyOtp= ({name,email,password}) => {

    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const {setShowUserLogin, setUser, axios, navigate, setState, state} = useAppContext ()

    const handleVerifyOtp = async (event) => {
        
        // console.log(name)
        event.preventDefault();
        setState('login')
        try {
            const {data} = await axios.post('/api/user/verify-otp',{name,email,password, otp});
            setMessage(data.message);
            
            // console.log(message)
            if(data.success){
                setUser(data.user)
                setShowUserLogin(false) 
                navigate('/'); 
                toast.success("Login Successfull")
                // console.log(data.message)
            }
            else {
               
                // console.log(data.message)
            }
            

        } catch (err) {
            setMessage(err.response?.data?.message || 'Verification failed!');
        }
    }

    const resendOTP = async () =>{
        if(email){
            const {data} = await axios.post(`/api/user/register`,{name,email, password});
            // console.log("ex"+data.success)
            if (data.success){
                setMessage('')
                setOtp('')
                toast.success("New OTP is sent")
                
            }else {
                toast.error(data.message)
            }
        } else {
            toast.error("Failed to send new otp!")


        setState('login')}
    }

    return(
        

            <form onSubmit={handleVerifyOtp} onClick={(e)=>e.stopPropagation()} className="relative flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
                <button onClick={()=> setShowUserLogin(false)} className=" cursor-pointer text-grey-100 text-xl absolute top-1 right-4 hover:text-red-500">x</button>
                <p className="text-2xl font-medium m-auto">
                    <span className="text-primary">Verify</span> OTP 
                </p>
                <div className='w-full'>
                    <div className="w-full mb-3">
                      <p>OTP is sent on <span className='text-primary'>{email}</span> <span className="cursor-pointer text-blue-500 text-decoration-line: underline" onClick={setState("register")}>edit</span> </p>
                      <input type="text" value={otp} placeholder="Enter OTP" onChange={ e=> setOtp(e.target.value)} className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" required />
                      <p className='text-red-500'>{message}  </p>
                    </div>
                    

                    <p>
                      <span onClick={resendOTP} className="hover:text-primary-dull cursor-pointer text-decoration-line: underline">Resend OTP</span>

                    </p>
                </div>
                <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
                Verify
               </button>
            

            </form>
        
    )
}

export default VerifyOtp;