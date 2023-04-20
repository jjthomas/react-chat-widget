import { useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";
import { addResponseMessage } from "../../store/dispatcher";

const API_ENDPOINT = "https://api.questacloud.com:446";
const socket = io(API_ENDPOINT);

// APIs

export const createChat = async () => {
  return (await fetch(`${API_ENDPOINT}/chat-create`, { method: "POST" })).json();
};

const getTLD = (host) => {
  var parts = host.split(".");
  var tld = parts.pop();
  while (parts.length > 0) {
    var part = parts.pop();
    tld = part + "." + tld;
    if (part.length >= 3) {
      break;
    }
  }
  return tld;
};

export const sendChatMessage = (chatId, message, sessionId) => {
  socket.emit("chat-message", {
    chatId,
    message,
    domain: getTLD(window.location.host),
    sessionId
  });
};

// Hooks

const DEFAULT_CHAT_HISTORY = {
  chatId: 0,
  chatHistory: [],
  suggestions: [],
};

const handleNewServerMessage = (newMessage, id) => {
    if (newMessage.user === 'human') {
      // Don't render user messages.
      return;
    }
    addResponseMessage(newMessage.message, id);
  };

export const useChatStream = () => {
  const [chatHistory, setChatHistory] = useState({
    ...DEFAULT_CHAT_HISTORY,
  });

  useEffect(() => {
    createChat().then(setChatHistory);
  }, []);

  const onChatHistoryUpdate = useCallback(
    (updatedChatHistory) => {
      if (updatedChatHistory.chatId === chatHistory.chatId) {
        setChatHistory(updatedChatHistory);
        handleNewServerMessage(updatedChatHistory.chatHistory.slice(-1)[0], updatedChatHistory.chatHistory.length);
      }
    },
    [chatHistory?.chatId, setChatHistory]
  );

  useEffect(() => {
    socket.on("chat-history-update", onChatHistoryUpdate);
    return () => {
      socket.off("chat-history-update");
    };
  }, [onChatHistoryUpdate]);

  return {
    chatHistory,
    sendChatMessage: (message, sessionId) =>
      sendChatMessage(chatHistory.chatId, message, sessionId),
  };
};