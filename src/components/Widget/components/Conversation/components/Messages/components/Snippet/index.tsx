import format from 'date-fns/format';

import { Link } from 'src/store/types';
import { MessageTheme } from '../Message';

import './styles.scss';

type Props = {
  message: Link;
  showTimeStamp: boolean;
  theme?: MessageTheme;
}

function Snippet({ message, showTimeStamp, theme }: Props) {
  return (
    <div>
      <div 
        className="rcw-snippet"
        style={{backgroundColor: theme?.backgroundColor, color: theme?.color}}
      >
        <h5 className="rcw-snippet-title">{message.title}</h5>
        <div className="rcw-snippet-details">
          <a href={message.link} target={message.target} className="rcw-link" style={{color: theme?.color}}>
            {message.link}
          </a>
        </div>
      </div>
      {showTimeStamp && <span className="rcw-timestamp">{format(message.timestamp, 'hh:mm')}</span>}
    </div>
  );
}

export default Snippet;
