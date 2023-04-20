import { useDispatch } from 'react-redux';
import { useState, useEffect, useCallback } from "react";

import { toggleChat, addUserMessage, addResponseMessage } from '../../store/actions';
import { isWidgetOpened } from '../../store/dispatcher';
import { AnyFunction } from '../../utils/types';
import { io } from "socket.io-client";

import WidgetLayout from './layout';

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

export const useChatStream = (onNewChatMessage) => {
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
        onNewChatMessage(updatedChatHistory.chatHistory.slice(-1)[0], updatedChatHistory.chatHistory.length);
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

const handleNewServerMessage = (newMessage, id) => {
  if (newMessage.user === 'human') {
    // Don't render user messages.
    return;
  }
  addResponseMessage(newMessage.message, id);
};

const {sendChatMessage: sendMsg} = useChatStream(handleNewServerMessage);

type Props = {
  title: string;
  titleAvatar?: string;
  subtitle: string;
  senderPlaceHolder: string;
  profileAvatar?: string;
  profileClientAvatar?: string;
  showCloseButton: boolean;
  fullScreenMode: boolean;
  autofocus: boolean;
  customLauncher?: AnyFunction;
  sessionId: string;
  handleQuickButtonClicked?: AnyFunction;
  handleTextInputChange?: (event: any) => void;
  chatId: string;
  handleToggle?: AnyFunction;
  launcherOpenLabel: string;
  launcherCloseLabel: string;
  launcherOpenImg: string;
  launcherCloseImg: string;
  sendButtonAlt: string;
  showTimeStamp: boolean;
  imagePreview?: boolean;
  zoomStep?: number;
  handleSubmit?: AnyFunction;
  showBadge?: boolean;
  resizable?: boolean;
  emojis?: boolean;
}

function Widget({
  title,
  titleAvatar,
  subtitle,
  senderPlaceHolder,
  profileAvatar,
  profileClientAvatar,
  showCloseButton,
  fullScreenMode,
  autofocus,
  customLauncher,
  sessionId,
  handleQuickButtonClicked,
  handleTextInputChange,
  chatId,
  handleToggle,
  launcherOpenLabel,
  launcherCloseLabel,
  launcherCloseImg,
  launcherOpenImg,
  sendButtonAlt,
  showTimeStamp,
  imagePreview,
  zoomStep,
  handleSubmit,
  showBadge,
  resizable,
  emojis
}: Props) {
  const dispatch = useDispatch();

  const toggleConversation = () => {
    dispatch(toggleChat());
    handleToggle ? handleToggle(isWidgetOpened()) : null;
  }

  const handleMessageSubmit = (userInput) => {
    if (!userInput.trim()) {      
      return;      
    }

    handleSubmit?.(userInput);
    dispatch(addUserMessage(userInput));
    sendMsg(userInput, sessionId);
  }

  const onQuickButtonClicked = (event, value) => {
    event.preventDefault();
    handleQuickButtonClicked?.(value)
  }

  return (
    <WidgetLayout
      onToggleConversation={toggleConversation}
      onSendMessage={handleMessageSubmit}
      onQuickButtonClicked={onQuickButtonClicked}
      title={title}
      titleAvatar={titleAvatar}
      subtitle={subtitle}
      senderPlaceHolder={senderPlaceHolder}
      profileAvatar={profileAvatar}
      profileClientAvatar={profileClientAvatar}
      showCloseButton={showCloseButton}
      fullScreenMode={fullScreenMode}
      autofocus={autofocus}
      customLauncher={customLauncher}
      onTextInputChange={handleTextInputChange}
      chatId={chatId}
      launcherOpenLabel={launcherOpenLabel}
      launcherCloseLabel={launcherCloseLabel}
      launcherCloseImg={launcherCloseImg}
      launcherOpenImg={launcherOpenImg}
      sendButtonAlt={sendButtonAlt}
      showTimeStamp={showTimeStamp}
      imagePreview={imagePreview}
      zoomStep={zoomStep}
      showBadge={showBadge}
      resizable={resizable}
      emojis={emojis}
    />
  );
}

export default Widget;
