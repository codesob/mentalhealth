import axios from 'axios';

const AI_BOT_API_URL = 'https://api.example.com/ai'; // Replace with your AI bot API endpoint

export const sendQueryToAiBot = async (query) => {
    try {
        const response = await axios.post(AI_BOT_API_URL, { query });
        return response.data;
    } catch (error) {
        console.error('Error communicating with AI bot:', error);
        throw error;
    }
};

export const getAiBotResponse = async (userInput) => {
    const response = await sendQueryToAiBot(userInput);
    return response.answer; // Adjust based on the actual response structure
};