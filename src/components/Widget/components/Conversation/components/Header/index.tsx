const close = require('../../../../../../../assets/clear-button.svg') as string;

import './style.scss';

interface Theme {
  color?: string;
  backgroundColor?: string;
  fontFamily?: string;
}

type Props = {
  title: string;
  subtitle: string;
  toggleChat: () => void;
  showCloseButton: boolean;
  titleAvatar?: string;
  theme?: Theme;
}

function Header({ title, subtitle, toggleChat, showCloseButton, titleAvatar, theme }: Props) {
  return (
    <div 
      className="rcw-header"
      style={{backgroundColor: theme?.backgroundColor, fontFamily: theme?.fontFamily, color: theme?.color}}
    >
      {showCloseButton &&
        <button className="rcw-close-button" onClick={toggleChat}>
          <img src={close} className="rcw-close" alt="close" />
        </button>
      }
      <h4 className="rcw-title">
        {titleAvatar && <img src={titleAvatar} className="avatar" alt="profile" />}
        {title}
      </h4>
      <span>{subtitle}</span>
    </div>
  );
}

export default Header;
