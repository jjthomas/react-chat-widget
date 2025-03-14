import { MessagesState, Link, MessageTypes } from '../types';

import { createReducer } from '../../utils/createReducer';
import { createNewMessage, createLinkSnippet, createComponentMessage } from '../../utils/messages';
import { MESSAGE_SENDER } from '../../constants';
import {
  MessagesActions,
  ADD_NEW_USER_MESSAGE,
  ADD_NEW_RESPONSE_MESSAGE,
  ADD_NEW_LINK_SNIPPET,
  ADD_COMPONENT_MESSAGE,
  DROP_MESSAGES,
  HIDE_AVATAR,
  DELETE_MESSAGES,
  MARK_ALL_READ,
  SET_BADGE_COUNT,
  SHOW_PREVIEW_MESSAGE
} from '../actions/types';

const initialState = {
  messages: [],
  badgeCount: 0
};

const messagesReducer = {
  [ADD_NEW_USER_MESSAGE]: (state: MessagesState, { text, showClientAvatar, id }) =>
    ({ ...state, messages: [...state.messages, createNewMessage(text, MESSAGE_SENDER.CLIENT, id)]}),

  [ADD_NEW_RESPONSE_MESSAGE]: (state: MessagesState, { text, id }) => {
    const idx = id ? state.messages.findIndex(msg => msg.customId === id) : -1;
    if (idx !== -1 && "text" in state.messages[idx]) {
      (state.messages[idx] as MessageTypes).text = text;
      return { ...state, messages: [...state.messages] };
    }

    const message = createNewMessage(text, MESSAGE_SENDER.RESPONSE, id);
    const shouldPreviewMessage = id === 'initial';
    return { 
      ...state, 
      messages: [...state.messages, message], 
      badgeCount: state.badgeCount + 1,
      previewMessage: shouldPreviewMessage ? message : state.previewMessage
    }
  },

  [SHOW_PREVIEW_MESSAGE]: (state: MessagesState, { message }) => {
    return {
      ...state,
      previewMessage: message
    }
  },
    

  [ADD_NEW_LINK_SNIPPET]: (state: MessagesState, { link, id }) =>
    ({ ...state, messages: [...state.messages, createLinkSnippet(link, id)] }),

  [ADD_COMPONENT_MESSAGE]: (state: MessagesState, { component, props, showAvatar, id }) =>
    ({ ...state, messages: [...state.messages, createComponentMessage(component, props, showAvatar, id)] }),

  [DROP_MESSAGES]: (state: MessagesState) => ({ ...state, messages: [] }),

  [HIDE_AVATAR]: (state: MessagesState, { index }) => state.messages[index].showAvatar = false,

  [DELETE_MESSAGES]: (state: MessagesState, { count, id }) =>
  ({
    ...state,
    messages: id
      ? state.messages.filter((_, index) => {
        const targetMsg = state.messages.findIndex(tMsg => tMsg.customId === id)
        return index < targetMsg - count + 1 || index > targetMsg
      })
      : state.messages.slice(0, state.messages.length - count)
  }),

  [SET_BADGE_COUNT]: (state: MessagesState, { count }) => ({ ...state, badgeCount: count }),

  [MARK_ALL_READ]: (state: MessagesState) =>
    ({ ...state, messages: state.messages.map(message => ({ ...message, unread: false })), badgeCount: 0 })
}

export default (state = initialState, action: MessagesActions) => createReducer(messagesReducer, state, action);
