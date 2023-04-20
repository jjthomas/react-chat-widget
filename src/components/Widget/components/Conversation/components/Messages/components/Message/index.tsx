import format from 'date-fns/format';
import markdownIt from 'markdown-it';
import markdownItSup from 'markdown-it-sup';
import markdownItSanitizer from 'markdown-it-sanitizer';
import markdownItClass from '@toycode/markdown-it-class';
import markdownItLinkAttributes from 'markdown-it-link-attributes';

import { MessageTypes } from 'src/store/types';

import './styles.scss';

export interface MessageTheme {
  color?: string;
  backgroundColor?: string;
  timestampColor?: string;
}
type Props = {
  message: MessageTypes;
  showTimeStamp: boolean;
  theme?: MessageTheme;
}

function Message({ message, showTimeStamp, theme }: Props) {
  const sanitizedHTML = markdownIt({ break: true })
    .use(markdownItClass, {
      img: ['rcw-message-img']
    })
    .use(markdownItSup)
    .use(markdownItSanitizer)
    .use(markdownItLinkAttributes, { attrs: { target: '_blank', rel: 'noopener' } })
    .render(message.text);

  return (
    <div className={`rcw-${message.sender}`}>
      <div 
        className="rcw-message-text" 
        dangerouslySetInnerHTML={{ __html: sanitizedHTML.replace(/\n$/,'') }} 
        style={{backgroundColor: theme?.backgroundColor, color: theme?.color}}
      />
      {showTimeStamp && <span className="rcw-timestamp" style={{color: theme?.timestampColor}}>{format(message.timestamp, 'hh:mm')}</span>}
    </div>
  );
}

export default Message;
