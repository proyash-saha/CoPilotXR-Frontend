import { Fragment, useState } from "react";

import { ReactComponent as ChatBotImage } from "../../assets/ChatBot.svg";

import "./chatbot.styles.scss";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Fragment>
      <button className="chatbot-button" onClick={toggleChat}>
        <ChatBotImage className="chatbot-image" />
      </button>
      <div className={`chatbot-message-container ${isOpen ? "open" : ""}`}>
        <div className="chatbot-message">Hello! What can I help you with?</div>
      </div>
    </Fragment>
  );
};

export default ChatBot;
