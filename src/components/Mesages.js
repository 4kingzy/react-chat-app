import React, { useState } from "react";
import {} from "../utils/util";
import {
  Button,
  Header,
  Main,
  Footer,
  MsgInput,
  Home,
  HeaderInner,
} from "../utils/style";
import Text from "./Text";
import { ReactComponent as PaperPlane } from "../logos/paper-plane.svg";
import "./style.css";
import { ReactComponent as WeChat } from "../logos/chat-logo.svg";
import { ReactComponent as ClearButton } from "../logos/delete.svg";

const Messages = () => {
  const [sdUser, setSdUser] = useState("");
  const [messages, setMessages] = useState([]);
  const [sDrone, setSDrone] = useState(null);
  const [room, setRoom] = useState(false);

  const handleLogin = () => {
    let username = document.querySelector("input").value;

    if (username) {
      setupScaledrone(username);
    }
  };

  const setupScaledrone = (user) => {
    const scaledrone = new window.Scaledrone("5skQT4qMSdk9VBAF", {
      data: user,
    });

    setSdUser(user);

    setSDrone(scaledrone);

    // when connection to scaledrone succedes create a room
    scaledrone.on("open", (error) => {
      if (!error) {
        // make an observable room
        const room = scaledrone.subscribe(`observable-room`);

        // Set room as ready to open chat
        room.on("open", (error) => {
          if (!error) {
            setRoom(true);
          }
        });

        // handle new messages
        room.on("message", (message) => {
          setMessages((messages) => [...messages, message]);
        });
      }
    });

    // Handle error and disconnects
    scaledrone.on("error", (error) => console.error(error));
    scaledrone.on("disconnect", () => {
      console.log("Disconnected");
    });
    scaledrone.on("reconnect", () => {
      console.log("Reconnected");
    });
  };

  const handleSend = () => {
    let messageText = document.querySelector("input").value;

    if (messageText) {
      sDrone.publish({
        room: `observable-room`,
        message: {
          message: messageText,
          name: sdUser,
        },
      });

      document.querySelector("input").value = "";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.target.id === "member-name") {
        handleLogin();
      } else if (e.target.id === "message") {
        handleSend(e);
      }
    }
  };

  const handleDelete = () => {
    setMessages([]);
  };

  return (
    <>
      {room ? (
        <Home>
          <Header>
            <HeaderInner>
              <WeChat className="weChat" />
              <Button className="deleteButton" onClick={handleDelete}>
                <ClearButton style={{ height: "20px", width: "20px" }} />
              </Button>
            </HeaderInner>
          </Header>
          <Main className="Messages">
            {messages.length !== 0
              ? messages.map((message, index) => (
                  <Text key={index} content={message} currentMember={sdUser} />
                ))
              : "No messages"}
          </Main>
          <Footer>
            <MsgInput
              type="text"
              placeholder="LETS CHAT!"
              id="message"
              onKeyDown={handleKeyDown}
            ></MsgInput>
            <Button onClick={handleSend}>
              <PaperPlane
                className="paperPlane"
                style={{ height: "30px", width: "30px" }}
              />
            </Button>
          </Footer>
        </Home>
      ) : (
        <div className="login">
          <div className="login-inner">
            <MsgInput
              type="text"
              id="member-name"
              placeholder="Member Name"
              onKeyDown={handleKeyDown}
            ></MsgInput>
            <Button onClick={handleLogin}>
              <PaperPlane
                className="paperPlane"
                style={{ height: "30px", width: "30px" }}
              />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Messages;
