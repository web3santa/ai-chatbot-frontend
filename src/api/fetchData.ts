// src/api/fetchData.ts
import axios from 'axios';
const apiUrl = "http://localhost:8000/talk"

export const fetchChatbotResponse = async (message: string) => {
  try {
    const response = await axios.post(apiUrl, { message });
    return response.data.chatbot;
  } catch (error) {
    console.error('Error fetching chatbot response:', error);
    throw error;
  }
};


// export const fetchChatbotResponse = async (message: string) => {
//   try {
//     const response = await fetch(apiUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ message }),
//     });
//     const data = await response.json();
//     return data.chatbot;
//   } catch (error) {
//     console.error('Error fetching chatbot response:', error);
//     throw error;
//   }
// };