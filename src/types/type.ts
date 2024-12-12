export interface User {
    id: string;
    email: string;
    name: string;
    role: 'customer' | 'admin';
}

export interface LoginResponse {
    success: boolean;
    message?: string; 
    token: string;
    user: User;
}

export interface UserRegisterData {
    name: string;
    email: string;
    password: string;
  }
   
export interface RegisterResponse {
    success: boolean;
    message?: string;
  }

export interface UserVerifyData {
    name: string;
    email: string;
    password: string;
    verificationCode: string
}
export interface VerifyResponse {
    success: boolean;
    message?: string;
  }