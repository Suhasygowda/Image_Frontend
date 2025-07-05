import { createContext, useEffect, useState } from "react"
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext()

const AppContextProvider = (props) => { 
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [credit, setCredit] = useState(0);
    const navigate = useNavigate();

    const backendurl = import.meta.env.VITE_BACKEND_URL
    
    const loadCreditsData = async () => {
        try {
            if (!token) return;
            
            const { data } = await axios.get(backendurl + '/api/user/credits', {
                headers: { token }
            });
            
            if (data.success) {
                setCredit(data.credits);
                setUser(data.user);
            } else {
                localStorage.removeItem('token');
                setToken('');
                setUser(null);
                setCredit(0);
            }
        } catch (error) {
            console.log(error);
            localStorage.removeItem('token');
            setToken('');
            setUser(null);
            setCredit(0);
            toast.error("Session expired. Please login again.");
        }
    }

    const generateImage = async (prompt) => {
        try {
            // Check if user is logged in
            if (!token) {
                toast.error("Please login to generate images");
                setShowLogin(true);
                return null;
            }

            // Check credit balance before making API call
            if (credit <= 0) {
                toast.error("No credit balance available");
                navigate('/buy-credit');
                return null;
            }

            const { data } = await axios.post(backendurl + '/api/image/generateimage', 
                { prompt }, 
                { headers: { token } }
            );

            if (data.success) {
                loadCreditsData();
                toast.success("Image generated successfully!");
                return data.resultImage;
            } else {
                toast.error(data.message);
                loadCreditsData();
                
                // Check if the error is due to insufficient credits
                if (data.creditBalance !== undefined && data.creditBalance <= 0) {
                    setTimeout(() => {
                        navigate('/buy-credit');
                    }, 1500); // Small delay to show the error message first
                }
                return null;
            }
        } catch (error) {
            console.error('Generate image error:', error);
            
            // More detailed error handling
            if (error.response) {
                console.error('API Response:', error.response.data);
                const errorData = error.response.data;
                
                // Check if it's a credit balance issue
                if (error.response.status === 403 && errorData.message === "No credit balance.") {
                    toast.error("No credit balance available");
                    setTimeout(() => {
                        navigate('/buy-credit');
                    }, 1500);
                } else {
                    toast.error(errorData.message || "Failed to generate image");
                }
            } else {
                toast.error("Network error. Please try again.");
            }
            return null;
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
        setCredit(0);
    }
    
    useEffect(() => {
        if (token) {
            loadCreditsData();
        }
    }, [token])
    
    const value = {
        user, setUser, showLogin, setShowLogin, backendurl, token, setToken, credit, setCredit, loadCreditsData, logout, generateImage
    }
    
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider