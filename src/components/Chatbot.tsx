"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { fetchChatbotResponse } from "@/api/fetchData";

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const endOfMessagesRef = useRef<any>(null); // Ref for scrolling to bottom

  const mutation = useMutation({
    mutationFn: fetchChatbotResponse,
    onSuccess: (response) => {
      console.log("Chatbot response:", response);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "user", text: message },
        { type: "bot", text: response },
      ]);
      setMessage("");
    },
    onError: (error) => {
      console.error("Chatbot request failed:", error);
    },
  });

  const handleSendMessage = async() => {

    
    if (message.trim()) {
      mutation.mutate(message);
    }
  };

  useEffect(() => {
    // Scroll to bottom of messages when a new message is added
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <div style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.type === 'user' ? 'right' : 'left' }}>
            <p className="text-black" style={{ background: msg.type === 'user' ? '#d1ffd1' : '#f1f1f1', padding: '10px', borderRadius: '5px', display: 'inline-block' }}>
              {msg.text}
            </p>
          </div>
        ))}
        <div ref={endOfMessagesRef} /> {/* Empty div to scroll to */}
      </div>
      <input
        type="text"
        placeholder="ask AI anyting you want.."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        className="input w-full"
      />
      <button onClick={handleSendMessage} className="btn btn-primary w-full">
        Send
      </button>
    </div>
        </div>

  
  );
};

export default ChatBot;
