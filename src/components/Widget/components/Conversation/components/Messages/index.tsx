import { useEffect, useRef, useState, ElementRef, ImgHTMLAttributes, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import format from 'date-fns/format';

import { scrollToBottom } from '../../../../../../utils/messages';
import { MessageTypes, Link, CustomCompMessage, GlobalState } from '../../../../../../store/types';
import { setBadgeCount, markAllMessagesRead } from '../../../../../../store/actions';
import { MESSAGE_SENDER } from '../../../../../../constants';

import Loader from './components/Loader';
import './styles.scss';

interface Theme {
  conversationBackgroundColor?: string;
  clientMessageColor?: string;
  clientMessageBubbleColor?: string;
  responseMessageColor?: string;
  responseMessageBubbleColor?: string;
  messageFontFamily?: string;
  timestampColor?: string;
}

type Props = {
  showTimeStamp: boolean,
  profileAvatar?: string;
  profileClientAvatar?: string;
  theme?: Theme;
}

function Messages({ profileAvatar, profileClientAvatar, showTimeStamp, theme }: Props) {
  const dispatch = useDispatch();
  const { messages, typing, showChat, badgeCount } = useSelector((state: GlobalState) => ({
    messages: state.messages.messages,
    badgeCount: state.messages.badgeCount,
    typing: state.behavior.messageLoader,
    showChat: state.behavior.showChat
  }));

  const messageRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // @ts-ignore
    scrollToBottom(messageRef.current);
    if (showChat && badgeCount) dispatch(markAllMessagesRead());
    else dispatch(setBadgeCount(messages.filter((message) => message.unread).length));
  }, [messages, badgeCount, showChat]);
    
  const getComponentToRender = (message: MessageTypes | Link | CustomCompMessage) => {
    const messageTheme = {
      color: isClient(message.sender) ? theme?.clientMessageColor : theme?.responseMessageColor,
      backgroundColor: isClient(message.sender) ? theme?.clientMessageBubbleColor : theme?.responseMessageBubbleColor,
      timestampColor: theme?.timestampColor
    };
    const ComponentToRender = message.component;
    if (message.type === 'component') {
      return <ComponentToRender {...message.props} theme={messageTheme} />;
    }
    return <ComponentToRender message={message} showTimeStamp={showTimeStamp} theme={messageTheme} />;
  };

  // TODO: Fix this function or change to move the avatar to last message from response
  // const shouldRenderAvatar = (message: Message, index: number) => {
  //   const previousMessage = messages[index - 1];
  //   if (message.showAvatar && previousMessage.showAvatar) {
  //     dispatch(hideAvatar(index));
  //   }
  // }

  const isClient = (sender) => sender === MESSAGE_SENDER.CLIENT;

  return (
    <div id="messages" className="rcw-messages-container" ref={messageRef} style={{fontFamily: theme?.messageFontFamily, backgroundColor: theme?.conversationBackgroundColor}}>
      {messages?.map((message, index) =>
        <div 
          className={`rcw-message ${isClient(message.sender) ? 'rcw-message-client' : ''}`} 
          key={`${index}-${format(message.timestamp, 'hh:mm')}`}
        >
          {((profileAvatar && !isClient(message.sender)) || (profileClientAvatar && isClient(message.sender))) &&
            message.showAvatar && 
            <img 
              src={isClient(message.sender) ? profileClientAvatar : profileAvatar} 
              className={`rcw-avatar ${isClient(message.sender) ? 'rcw-avatar-client' : ''}`} 
              alt="profile"
            />
          }
          {getComponentToRender(message)}
        </div>
      )}
      <Loader typing={typing} />
    </div>
  );
}

export default Messages;
