import axios from "axios";
import { LoginResponse, RegisterResponse, UserRegisterData, VerifyResponse, UserVerifyData } from "@/types/type";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        if (!apiUrl) {
            throw new Error('API_URL environment variable is not set.');
        }
        const response = await axios.post(`${apiUrl}/users/login`, { email, password }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error: any) {
        console.error("Error logging in:", error);
        throw new Error(`Login failed: ${error.message}`);
    }
};

const registerUser = async (userData: UserRegisterData): Promise<RegisterResponse> => {
    try {
        const response = await axios.post(`${apiUrl}/users/register`, userData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log("Response status:", response.status); 
          return response.data;
        } catch (error: any) {
          console.error('Register error:', error.response?.data, error.response?.status); 
          throw new Error(`Register failed: ${error.message}`);
        }
  };

const verifyUser = async(userData: UserVerifyData): Promise<VerifyResponse> => {
    try {
        const response = await axios.post( `${apiUrl}/users/verify`, userData,{
            headers: {
                'Content-type': 'application/json',
            },
        });
        return response.data;
    }        catch (error : any){
            throw new Error(`Verify failed: ${error.message}`);
        }
}


export { loginUser, registerUser, verifyUser };