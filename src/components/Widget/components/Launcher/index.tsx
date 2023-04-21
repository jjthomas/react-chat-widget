import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import Badge from './components/Badge';
import { GlobalState } from '../../../../store/types';
import { setBadgeCount, showPreviewMessage } from '../../../../store/actions';

import './style.scss';
import MessagePreview from './components/MessagePreview';

const openLauncher = require('../../../../../assets/launcher_button.svg') as string;
const close = require('../../../../../assets/clear-button.svg') as string;

type Props = {
  toggle: () => void;
  chatId: string;
  openLabel: string;
  closeLabel: string;
  closeImg: string;
  openImg: string;
  showBadge?: boolean;
  theme?: {
    backgroundColor?: string;
    previewBackgroundColor?: string;
    previewColor?: string;
    previewFontFamily?: string;
  }
}

function Launcher({ toggle, chatId, openImg, closeImg, openLabel, closeLabel, showBadge, theme }: Props) {
  const dispatch = useDispatch();
  const { showChat, badgeCount } = useSelector((state: GlobalState) => ({
    showChat: state.behavior.showChat,
    badgeCount: state.messages.badgeCount
  }));

  const toggleChat = () => {
    toggle();
    if (!showChat) {
      // on open
      dispatch(setBadgeCount(0));
      dispatch(showPreviewMessage(undefined));
    }
  }

  return (
    <button type="button" className={cn('rcw-launcher-container', { 'rcw-hide-sm': showChat })} onClick={toggleChat} aria-controls={chatId}>
      <MessagePreview theme={{
        backgroundColor: theme?.previewBackgroundColor,
        color: theme?.previewColor,
        fontFamily: theme?.previewFontFamily
      }} />
      <div className='rcw-launcher' style={{backgroundColor: theme?.backgroundColor}} >
        {!showChat && showBadge && <Badge badge={badgeCount} />}
        {showChat ?
          <img src={closeImg || close} className="rcw-close-launcher" alt={openLabel} /> :
          <img src={openImg || openLauncher} className="rcw-open-launcher" alt={closeLabel} />
        }
      </div>
    </button>
  );
}

export default Launcher;
