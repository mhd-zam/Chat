"use client";
// hooks/useWebSocket.ts
import { useState, useEffect, useCallback, useRef } from "react";

// Define types for our messages and hook return values
interface Message {
  id?: string;
  type: string;
  text: string;
  sender: string;
  timestamp?: string;
}

interface sendMessageType {
  type: string;
  userId?: string;
  username?: string;
  recipientId?: string;
  text?: string;
}

interface UseWebSocketReturn {
  messages: Message[];
  sendMessage: ({}: sendMessageType) => void;
  isConnected: boolean;
  error: string | null;
  clearError: () => void;
  reconnect: () => void;
}

export const useWebSocket = (url: string): UseWebSocketReturn => {
  // State management
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Refs for WebSocket instance and reconnection attempts
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>(null);

  // Initialize WebSocket connection
  const connect = useCallback(() => {
    try {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      // Connection opened
      ws.onopen = () => {
        console.log("WebSocket Connected");
        setIsConnected(true);
        setError(null);
        reconnectAttempts.current = 0;

        try {
          const user = JSON.parse(localStorage.getItem("userDetails"));
          ws.send(
            JSON.stringify({
              type: "authenticate",
              token: localStorage.getItem("token"),
              ...user,
            })
          );
        } catch (err) {
          console.error("Error sending initial connection message:", err);
          setError("Failed to send initial connection message");
        }
      };

      // Connection closed
      ws.onclose = (event) => {
        console.log("WebSocket Disconnected", event.code, event.reason);
        setIsConnected(false);

        // Attempt to reconnect if not closed intentionally
        if (
          !event.wasClean &&
          reconnectAttempts.current < maxReconnectAttempts
        ) {
          const timeoutDuration = Math.min(
            1000 * Math.pow(2, reconnectAttempts.current),
            10000
          );
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttempts.current += 1;
            connect();
          }, timeoutDuration);
        }
      };

      // Handle incoming messages
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log(data, "dsfsfsdf");
          setMessages(data);
          console.log(data, "sdfsdfsdfdf");
        } catch (e) {
          console.error("Error parsing message:", e);
          setError("Failed to parse incoming message");
        }
      };

      // Handle errors
      ws.onerror = (event) => {
        console.log("WebSocket Error:", event);
        setError("WebSocket connection error");
      };
    } catch (err) {
      console.error("Failed to create WebSocket connection:", err);
      setError("Failed to create WebSocket connection");
    }
  }, [url]);

  // Initial connection
  useEffect(() => {
    connect();

    // Cleanup function
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connect]);

  // Send message function
  const sendMessage = useCallback(
    (text: string, sender: string, isMessage: boolean) => {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        setError("Connection is not open");
        return;
      }

      try {
        let message = {};
        if (isMessage) {
          message = {
            type: "message",
            text,
            sender,
            timestamp: new Date().toISOString(),
          };
        } else {
          message = text;
        }

        wsRef.current.send(JSON.stringify(message));
      } catch (err) {
        console.error("Error sending message:", err);
        setError("Failed to send message");
      }
    },
    []
  );

  // Clear error function
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Manual reconnect function
  const reconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
    }
    reconnectAttempts.current = 0;
    connect();
  }, [connect]);

  return {
    messages,
    sendMessage,
    isConnected,
    error,
    clearError,
    reconnect,
  };
};
