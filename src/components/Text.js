import React from "react";
import { MsgContainer, MsgInner } from "../utils/style";
import "./style.css";

const Text = ({ content, currentMember }) => {
  console.log(content.data.name);
  const currentMemberMessage = content.data.name === currentMember;

  let time = new Date(content.timestamp * 1000);
  /* console.log(time); */

  var options = { hour: "numeric", minute: "numeric", hour12: false };

  time = time.toLocaleString("hr", options);

  return (
    <MsgContainer
      userMessage
      className={
        "Message " + (currentMemberMessage ? "align-left" : "align-right")
      }
    >
      <MsgInner className="message-inner">
        <div className="username">
          {currentMemberMessage ? "You" : content.data.name}
        </div>
        <div>{content.data.message}</div>
        <small>{time}</small>
      </MsgInner>
    </MsgContainer>
  );
};

export default Text;
