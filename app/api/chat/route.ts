import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // List of common greetings
    const greetings = ['hello', 'hi', 'hey', 'hola', 'greetings', 'morning', 'afternoon', 'evening'];
    
    // Check if the message contains any greeting
    const isGreeting = greetings.some(greeting => message.toLowerCase().includes(greeting));

    // Predefined response library
    const responseLibrary: { [key: string]: string } = {
      // Greetings
      "hello": "Hello! How can I assist you today?",
      "hi": "Hi there! How can I help you?",
      "hey": "Hey! How can I assist you today?",
      "greetings": "Greetings! How can I be of service?",
      "morning": "Good morning! How can I help today?",
      "afternoon": "Good afternoon! How may I assist you?",
      "evening": "Good evening! What can I do for you today?",
      "bye": "do have a lovely day",
      // Common inquiries
      "how are you": "I'm just a simulated bot, but I'm doing great! 😊",
      "what is your name": "I'm Daredev's AI assistant! You can call me DareBot.",
      "tell me a joke": "Why don't skeletons fight each other? They don't have the guts! 😄",
      "what can you do": "I can answer questions, provide help, and offer general assistance. Just ask away!",
      "help": "I'm here to assist you! What do you need help with?",
      "who are you": "I'm Daredev's chatbot assistant, ready to help you out with anything you need.",
      "lol": "happy you found it funny",
      // Project-related questions
      "what project is this": "This is a chatbot project where I provide simulated responses to assist with inquiries. Built with Next.js and OpenAI API.",
      "tell me about the project": "The project is designed to provide a responsive chat interface. I fetch and provide answers based on the input messages. It uses the OpenAI API for some functionality, with additional improvements added by Daredev.",
      
      // Technical questions
      "what is openai": "OpenAI is an AI research and deployment company that aims to ensure artificial general intelligence (AGI) benefits all of humanity. It is the technology behind my responses!",
      "what is nextjs": "Next.js is a React-based framework that helps developers build server-rendered React applications easily. It’s great for performance and SEO!",
      
      // Personal questions (add as needed)
      "where are you from": "I'm an AI created by Daredev, so I don't have a physical origin. But I reside here to assist you online!",
      "how old are you": "I don't have an age, as I am a program created by Derek Banor to help you, but you can consider me forever young! 😊",
      
      // Error handling & fallback
      "fallback": "Sorry, I didn't understand that. Could you please rephrase or ask something else? I'm here to help!",
    };

    // Check if the message is a greeting and respond accordingly
    if (isGreeting) {
      return NextResponse.json({ message: responseLibrary[message.toLowerCase()] || "Hello! How can I assist you today?" });
    }

    // Respond to specific inquiries or questions
    const lowerCaseMessage = message.toLowerCase();
    const response = responseLibrary[lowerCaseMessage] || responseLibrary["fallback"];

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}




/* for openAI
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
*/