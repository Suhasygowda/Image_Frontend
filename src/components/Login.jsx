import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from 'framer-motion'
import axios from 'axios'
import toast from "react-hot-toast";

const Login = () => {
  const [state, setState] = useState('Login');
  const { setShowLogin, backendurl, setToken, setUser } = useContext(AppContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (state === 'Login') {
        const { data } = await axios.post(`${backendurl}/api/user/login`, { email, password });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem('token', data.token);
          setShowLogin(false);
          toast.success("Login Successful");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendurl}/api/user/register`, { name, email, password });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem('token', data.token);
          setShowLogin(false);
          toast.success("Registered Successfully");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, []);

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      <motion.form onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-white p-10 rounded-xl text-slate-500">
        
        <h1 className="text-center text-2xl text-neutral-700 font-medium">{state}</h1>
        <p className="text-sm">
          {state === 'Login' ? 'Welcome back! Please sign in to continue' : 'Create your account to get started'}
        </p>
        
        {state !== 'Login' && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
            <img src={assets.user_icon} alt="" />
            <input 
              onChange={e => setName(e.target.value)} 
              value={name} 
              type="text" 
              placeholder='Full Name' 
              required 
              className="outline-none text-sm flex-1"
              disabled={isLoading}
            />
          </div>
        )}
        
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
          <img src={assets.email_icon} alt="" />
          <input 
            onChange={e => setEmail(e.target.value)} 
            value={email} 
            type="email" 
            placeholder='Email Id' 
            required 
            className="outline-none text-sm flex-1"
            disabled={isLoading}
          />
        </div>
        
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.lock_icon} alt="" />
          <input 
            onChange={e => setPassword(e.target.value)} 
            value={password} 
            type="password" 
            placeholder='Password' 
            required 
            className="outline-none text-sm flex-1"
            disabled={isLoading}
          />
        </div>

        {state === 'Login' && (
          <p className="text-sm text-blue-600 my-4 cursor-pointer">Forgot Password?</p>
        )}

        <button 
          type="submit" 
          disabled={isLoading}
          className="bg-blue-600 w-full text-white py-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors disabled:bg-blue-400"
        >
          {isLoading ? 'Please wait...' : (state === 'Login' ? 'Login' : 'Create Account')}
        </button>

        {state === 'Login' ? (
          <p className="mt-5 text-center">
            Don't have an Account? 
            <span className="text-blue-600 cursor-pointer ml-1" onClick={() => setState('Sign Up')}>
              Sign up
            </span>
          </p>
        ) : (
          <p className="mt-4 text-center">
            Already have an Account? 
            <span className="text-blue-600 cursor-pointer ml-1" onClick={() => setState('Login')}>
              Login
            </span>
          </p>
        )}

        <img 
          onClick={() => setShowLogin(false)} 
          src={assets.cross_icon} 
          alt="" 
          className="absolute top-5 right-5 cursor-pointer"
        />
      </motion.form>
    </div>
  );
}

export default Login