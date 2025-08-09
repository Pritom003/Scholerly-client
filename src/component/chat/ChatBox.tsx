/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// component/Chat/ChatBox.tsx
"use client";
import { useEffect, useState } from "react";
import Ably from "ably";
import { FiSend } from "react-icons/fi";

type ChatBoxProps = {
  tutorId: string;
  bookingId: string; // link to booking
};

const ChatBox = ({ tutorId, bookingId }: ChatBoxProps) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [ablyClient, setAblyClient] = useState<any>(null);

  useEffect(() => {
    const ably = new Ably.Realtime({ authUrl: "/api/v1/ably/token" });
    setAblyClient(ably);

    const channel = ably.channels.get(`chat:${bookingId}`);
    channel.subscribe("new-message", (msg) => {
      setMessages((prev) => [...prev, msg.data]);
    });

    return () => {
      channel.unsubscribe();
      ably.close();
    };
  }, [bookingId]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    await fetch("/api/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookingId,
        sender: tutorId, 
        receiver: tutorId,
        message: input,
      }),
    });
    setInput("");
  };

  return (
    <div className="fixed bottom-0 right-6 w-80 bg-white shadow-lg border rounded-t-lg flex flex-col">
      <div className="p-2 bg-[#815606] text-white text-center font-semibold">
        Chat with Tutor
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg text-sm ${
              msg.sender === tutorId ? "bg-gray-200 self-start" : "bg-[#815606] text-white self-end"
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>
      <div className="flex border-t p-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded p-2 text-sm"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-[#815606] text-white p-2 rounded"
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
