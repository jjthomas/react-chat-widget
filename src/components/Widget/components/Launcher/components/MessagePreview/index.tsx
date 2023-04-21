import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { showPreviewMessage } from "../../../../../../store/actions";
import { GlobalState } from "@types";

interface MessagePreviewProps {
  theme?: {
    backgroundColor?: string;
    color?: string;
    fontFamily?: string;
  }
};


export default function MessagePreview({ theme }: MessagePreviewProps) {
  const dispatch = useDispatch();
  const { previewMessage } = useSelector((state: GlobalState) => ({
    previewMessage: state.messages.previewMessage
  }));

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(showPreviewMessage(undefined));
  }

  return previewMessage ? (
    <div className="rcw-message-preview" style={{ backgroundColor: theme?.backgroundColor, color: theme?.color, fontFamily: theme?.fontFamily}}>
      <div className="rcw-message-preview-close" aria-label="Close message preview" role="button" onClick={handleClose}>
        <svg aria-hidden="true" width="10" height="10" viewBox="0 0 23 23" fill="none"><path fillRule="evenodd" clipRule="evenodd" fill="white" d="M9.34583 11.2L0.384011 2.23818C-0.128004 1.72617 -0.128004 0.896026 0.384011 0.384011C0.896026 -0.128004 1.72617 -0.128004 2.23818 0.384011L11.2 9.34583L20.1618 0.384011C20.6738 -0.128004 21.504 -0.128004 22.016 0.384011C22.528 0.896026 22.528 1.72617 22.016 2.23818L13.0542 11.2L22.016 20.1618C22.528 20.6738 22.528 21.504 22.016 22.016C21.504 22.528 20.6738 22.528 20.1618 22.016L11.2 13.0542L2.23818 22.016C1.72617 22.528 0.896026 22.528 0.384011 22.016C-0.128003 21.504 -0.128003 20.6738 0.384011 20.1618L9.34583 11.2Z"></path></svg>
      </div>
      {previewMessage?.text}
    </div>
  ) : <></>;
}