'use client';

import { useState, useEffect, useRef } from 'react';
import '../styles/chat.css'; // Import the CSS

export default function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null); // Reference to scroll to the bottom

  useEffect(() => {
    // Scroll to the bottom whenever the messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]); // Dependency on messages, so it runs every time the messages change

  const handleSend = async () => {
    if (!input) return; // Prevent sending empty messages

    // Add user's message to the message list
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, isUser: true },
    ]);

    setInput(''); // Clear input immediately after sending
    setIsLoading(true); // Show typing dots

    // Simulate delay before bot responds
    setTimeout(async () => {
      const res = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message: input }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      // Add bot's response to the message list
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.message, isUser: false },
      ]);
      const botResponse = data.message;
      let currentResponse = '';
      const typingSpeed = 100; // Milliseconds between each character
  
      for (let i = 0; i < botResponse.length; i++) {
        setTimeout(() => {
          currentResponse += botResponse[i];
          setMessages((prevMessages) => [
            ...prevMessages.slice(0, -1), // Remove the "loading" message
            { text: currentResponse, isUser: false },
          ]);
        }, i * typingSpeed);
      }
  

      setIsLoading(false);
    }, 2000); // 2-second delay to simulate "typing"
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default action of the Enter key (e.g., form submission)
      handleSend(); // Trigger the send function
    }
  };

  return (
    <div className="chat-container">
      <div className="header">
        <h1>Daredev AI Assistant</h1>
      </div>

      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.isUser ? 'user-message' : 'bot-message'}`}
          >
            <p>{msg.text}</p>
          </div>
        ))}

        {isLoading && (
          <div className="chat-message loading">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        )}

        {/* Empty div to scroll to the bottom */}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-section">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress} // Listen for the Enter key press
          placeholder="Type a message..."
          className="chat-input"
        />
        <button onClick={handleSend} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
}





/*'use client'

import { useChat } from 'ai/react'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ChatBox() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
    onError: (error) => {
      console.error('Chat error:', error);
      setError('An error occurred while sending the message.');
    },
  })
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsTyping(true);
    setError(null);
    try {
      await handleSubmit(e);
    } catch (error) {
      console.error('Submit error:', error);
      setError('An error occurred while sending the message.');
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>AI Chat</CardTitle>
        </CardHeader>
        <CardContent className="h-[60vh] overflow-y-auto">
          {messages.map(m => (
            <div key={m.id} className={`mb-4 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded-lg ${m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                {m.content}
              </span>
            </div>
          ))}
          {isTyping && (
            <div className="text-left">
              <span className="inline-block p-2 rounded-lg bg-gray-200 text-black">
                AI is typing...
              </span>
            </div>
          )}
          {error && (
            <div className="text-center text-red-500 mt-2">
              {error}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <form onSubmit={onSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-grow"
            />
            <Button type="submit" disabled={isTyping}>Send</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
*/
