import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_API_URL;
export const sendMessage = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/llm/authorize_gmail`
    );
  } catch (error) {
    console.error('Error sending message:', error);
  }
};
