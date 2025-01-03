"use client";
import React, { useEffect, useState } from "react";
import { Search, MessageSquare, Settings } from "lucide-react";
import { useWebSocket } from "../hook/useWebSocket";
import UserProfileForm from "../component/chat/createUser";

const ChatInterface = () => {
  const [selectedUser, setSelectedUser] = useState("login_success");
  const [chatMessage, setChatMessage] = useState([]);
  const [users, setUsers] = useState([]);

  const { clearError, error, isConnected, messages, reconnect, sendMessage } =
    useWebSocket("ws://localhost:8080");

  useEffect(() => {
    if (messages?.type == "userList") {
      setUsers(messages?.users);
    }
  }, [messages]);

  if (messages.type == "login_failed") {
    return <UserProfileForm sendMessage={sendMessage} />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">Messages</h1>
            <Settings className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
          </div>
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages"
              className="w-full px-4 py-2 bg-gray-100 rounded-lg pl-10"
            />
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto">
          {users.map((user) => (
            <div
              key={user.userId}
              onClick={() => setSelectedUser(user)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                selectedUser?.userId === user.userId ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex items-center">
                <img
                  src={user.profileUrl}
                  alt={user.username}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3 flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{user.username}</h3>
                    <span className="text-sm text-gray-500">{user.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500 truncate">
                      {user.lastMessage}
                    </p>
                    {user.unread > 0 && (
                      <span className="bg-blue-500 text-white rounded-full px-2 py-0.5 text-xs">
                        {user.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center">
                <img
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <h2 className="font-semibold">{selectedUser.name}</h2>
                  <p className="text-sm text-gray-500">Online</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessage?.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isSent ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.isSent
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-900"
                    }`}
                  >
                    <p>{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.isSent ? "text-blue-100" : "text-gray-500"
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={() => {
                    sendMessage("hello system", "system");
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700">
                Select a conversation
              </h3>
              <p className="text-gray-500">
                Choose a user from the sidebar to start chatting
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
