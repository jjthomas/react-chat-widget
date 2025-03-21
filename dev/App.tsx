import { Component } from 'react';

import { Widget, addResponseMessage, setQuickButtons, toggleMsgLoader, addLinkSnippet } from '../index';
import { addUserMessage } from '..';
import React from 'react';

export default class App extends Component {
  componentDidMount() {
    addResponseMessage('Welcome to this awesome chat!');
    addLinkSnippet({ link: 'https://google.com', title: 'Google' });
    addResponseMessage('![](https://raw.githubusercontent.com/Wolox/press-kit/master/logos/logo_banner.png)');
    addResponseMessage('![vertical](https://d2sofvawe08yqg.cloudfront.net/reintroducing-react/hero2x?1556470143)');
    addResponseMessage("test", "ramsey");
    setTimeout(() => addResponseMessage("test\ntest", "ramsey"), 5000)
    setTimeout(() => addResponseMessage("test\ntest\ntest", "ramsey"), 10000)
  }

  handleNewUserMessage = (newMessage: any) => {
    toggleMsgLoader();
    setTimeout(() => {
      toggleMsgLoader();
      if (newMessage === 'fruits') {
        setQuickButtons([ { label: 'Apple', value: 'apple' }, { label: 'Orange', value: 'orange' }, { label: 'Pear', value: 'pear' }, { label: 'Banana', value: 'banana' } ]);
      } else {
        addResponseMessage(newMessage);
      }
    }, 2000);
  }

  handleQuickButtonClicked = (e: any) => {
    addResponseMessage('Selected ' + e);
    setQuickButtons([]);
  }

  handleSubmit = (msgText: string) => {
    if(msgText.length < 80) {
      addUserMessage("Uh oh, please write a bit more.");
      return false;
    }
    return true;
  }

  render() {
    return (
      <Widget
        initialMessage={"Hello!\n\nHow can I help you?"}
        title="Bienvenido"
        subtitle="Asistente virtual"
        titleAvatar="https://upload.wikimedia.org/wikipedia/commons/2/24/LEGO_logo.svg"
        senderPlaceHolder="Escribe aquí ..."
        handleNewUserMessage={this.handleNewUserMessage}
        handleQuickButtonClicked={this.handleQuickButtonClicked}
        imagePreview
        handleSubmit={this.handleSubmit}
        emojis={false}
        theme={{
          headerColor: "#000",
          headerFontFamily: "Tahoma, sans-serif",
          headerBackgroundColor: "#00ff00",
          launcherBackgroundColor: "#f000f0",
          conversationBackgroundColor: "#DDD",
          composerBackgroundColor: "#AAA",
          inputColor: "#00FF00",
          inputFontFamily: "Courier New, monospace",
          inputBackgroundColor: "#f0f000",
          sendButtonColor: "#008f00",
          clientMessageBubbleColor: "#ff0000",
          responseMessageColor: "#fff",
          responseMessageBubbleColor: "#0000ff",
          messageFontFamily:"Tahoma, sans-serif",
          timestampColor: "#ff0000",
          previewBackgroundColor: "#000",
          previewColor: "#fff",
          previewFontFamily: "Tahoma, sans-serif",
        }}
      />
    );
  }
}
