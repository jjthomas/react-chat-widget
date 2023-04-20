import { Provider } from 'react-redux';

import Widget from './components/Widget';

import store from  './store';

import { AnyFunction } from './utils/types';

export interface Theme {
  headerColor?: string;
  headerFontFamily?: string;
  headerBackgroundColor?: string;
  launcherBackgroundColor?: string;
  conversationBackgroundColor?: string;
  composerBackgroundColor?: string;
  inputColor?: string;
  inputFontFamily?: string;
  inputBackgroundColor?: string;
  sendButtonColor?: string;
  clientMessageColor?: string;
  clientMessageBubbleColor?: string;
  responseMessageColor?: string;
  responseMessageBubbleColor?: string;
  messageFontFamily?: string;
  timestampColor?: string;
}

type Props = {
  sessionId?: string;
  handleQuickButtonClicked?: AnyFunction;
  title?: string;
  titleAvatar?: string;
  subtitle?: string;
  senderPlaceHolder?: string;
  showCloseButton?: boolean;
  fullScreenMode?: boolean;
  autofocus?: boolean;
  profileAvatar?: string;
  profileClientAvatar?: string;
  launcher?: AnyFunction;
  handleTextInputChange?: (event: any) => void;
  chatId?: string;
  handleToggle?: AnyFunction;
  launcherOpenLabel?: string,
  launcherCloseLabel?: string,
  launcherCloseImg?: string,
  launcherOpenImg?: string,
  sendButtonAlt?: string;
  showTimeStamp?: boolean;
  imagePreview?: boolean;
  zoomStep?: number;
  emojis?: boolean;
  handleSubmit?: AnyFunction;
  showBadge?: boolean;
  resizable?: boolean;
  theme?: Theme;
} & typeof defaultProps;

function ConnectedWidget({
  title,
  titleAvatar,
  subtitle,
  senderPlaceHolder,
  showCloseButton,
  fullScreenMode,
  autofocus,
  profileAvatar,
  profileClientAvatar,
  launcher,
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
  emojis,
  theme
}: Props) {
  return (
    <Provider store={store}>
      <Widget
        title={title}
        titleAvatar={titleAvatar}
        subtitle={subtitle}
        handleQuickButtonClicked={handleQuickButtonClicked}
        senderPlaceHolder={senderPlaceHolder}
        profileAvatar={profileAvatar}
        profileClientAvatar={profileClientAvatar}
        showCloseButton={showCloseButton}
        fullScreenMode={fullScreenMode}
        autofocus={autofocus}
        customLauncher={launcher}
        handleTextInputChange={handleTextInputChange}
        chatId={chatId}
        handleToggle={handleToggle}
        launcherOpenLabel={launcherOpenLabel}
        launcherCloseLabel={launcherCloseLabel}
        launcherCloseImg={launcherCloseImg}
        launcherOpenImg={launcherOpenImg}
        sendButtonAlt={sendButtonAlt}
        showTimeStamp={showTimeStamp}
        imagePreview={imagePreview}
        zoomStep={zoomStep} 
        handleSubmit={handleSubmit}
        showBadge={showBadge}
        resizable={resizable}
        emojis={emojis}
        sessionId={sessionId}
        theme={theme}
      />
    </Provider>
  );
}

const defaultProps = {
  title: 'Welcome',
  subtitle: 'This is your chat subtitle',
  senderPlaceHolder: 'Type a message...',
  showCloseButton: true,
  fullScreenMode: false,
  autofocus: true,
  chatId: 'rcw-chat-container',
  launcherOpenLabel: 'Open chat',
  launcherCloseLabel: 'Close chat',
  launcherOpenImg: '',
  launcherCloseImg: '',
  sendButtonAlt: 'Send',
  showTimeStamp: true,
  imagePreview: false,
  zoomStep: 80,
  showBadge: true,
};
ConnectedWidget.defaultProps = defaultProps;

export default ConnectedWidget;
