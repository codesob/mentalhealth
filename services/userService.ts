import axios from 'axios';

const API_URL = '/api/users';

interface UserData {
    username: string;
    email: string;
    password: string;
    fullName?: string;
}

interface LoginCredentials {
    email: string;
    password: string;
    remember?: boolean;
}

interface UserProfile {
    id: string;
    username: string;
    email: string;
    fullName?: string;
    avatar?: string;
    online?: boolean;
}

const userService = {
    register: async (userData: UserData): Promise<UserProfile> => {
        try {
            const response = await axios.post(`${API_URL}/register`, userData);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Registration failed');
        }
    },

    login: async (credentials: LoginCredentials): Promise<{ user: UserProfile; token: string }> => {
        try {
            const response = await axios.post(`${API_URL}/login`, credentials);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    },

    fetchUser: async (userId: string): Promise<UserProfile> => {
        try {
            const response = await axios.get(`${API_URL}/${userId}`);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Failed to fetch user data');
        }
    },

    updateProfile: async (userId: string, updatedData: Partial<UserProfile>): Promise<UserProfile> => {
        try {
            const response = await axios.put(`${API_URL}/${userId}`, updatedData);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Failed to update user profile');
        }
    },

    logout: async (): Promise<void> => {
        try {
            await axios.post(`${API_URL}/logout`);
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Failed to logout');
        }
    }
};

export default userService;