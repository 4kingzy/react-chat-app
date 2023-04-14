import React, { useState, useEffect } from "react";
import { randomColor, randomName } from "../utils/util";
import {
  Button,
  Header,
  Main,
  Footer,
  MsgContainer,
  MsgInput,
  MsgInner,
  Home,
  HeaderInner,
} from "../utils/style";
import Text from "./Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";

const Other = () => {
  const [member, setMember] = useState([]);
  const [messages, setMessages] = useState([]);
  const [drone, setDrone] = useState(null);
  const [room, setRoom] = useState(false);

  useEffect(() => {
    if (member.username !== "") {
      const drone = new window.Scaledrone("5skQT4qMSdk9VBAF", {
        data: member,
      });
      setDrone(drone);
    }
  }, [member]);

  useEffect(() => {
    const droneEvents = () => {
      drone.on("open", (error) => {
        if (error) {
          return console.error(error);
        }
        member.username = randomName();
        member.color = randomColor();
        setMember(member);
        roomEvents();
      });

      drone.on("error", (error) => console.error(error));
      drone.on("disconnect", () => {
        console.log("Disconnected");
      });
      drone.on("reconnect", () => {
        console.log("Reconnected");
      });
    };

    const roomEvents = () => {
      const room = drone.subscribe(`observable-room`);
      room.on("open", (error) => {
        if (error) {
          console.error(error);
        } else {
          console.log("inside of the room");
          setRoom(true);
        }
      });
      room.on("message", (message) => {
        receiveMessage(message);
      });
    };

    const receiveMessage = (message) => {
      setMessages((messages) => [...messages, message]);
    };

    if (drone && !member.username) {
      droneEvents();
    }
  }, [drone, member, room, messages]);

  const handleSend = (e) => {
    e.preventDefault();
    let messageText = document.querySelector("input").value;
    let msg = {
      message: messageText,
      name: member.username,
      color: member.color,
    };
    drone.publish({
      room: `observable-room`,
      message: msg,
    });
    messageText = "";
  };

  return (
    <Home>
      <Header>
        <HeaderInner>CHAT APP - {member.username}</HeaderInner>
      </Header>
      <Main isSecondary className="Messages">
        {messages.map((message, index) => {
          return (
            <Text key={index} messages={message} currentMemeber={member} />
          );
        })}
        ;
      </Main>
      <Footer isSecondary>
        <MsgInput type="text" placeholder="Type here..."></MsgInput>
        <Button src={faPaperPlane} onClick={handleSend}></Button>
      </Footer>
    </Home>
  );
};

export default Other;
