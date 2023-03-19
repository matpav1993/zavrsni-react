import "./App.css";
import React, { Component } from "react";
import Input from "./Input";
import Messages from "./Messages";

function randomUser() {
  const avatars = [
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    "https://cdn-icons-png.flaticon.com/512/2202/2202112.png",
    "https://cdn-icons-png.flaticon.com/512/201/201634.png",
    "https://cdn-icons-png.flaticon.com/512/3135/3135789.png",
    "https://cdn-icons-png.flaticon.com/512/219/219970.png",
  ];
  const adjectives = ["John", "Donald", "Will"];
  const nouns = ["Smith", "Jefferson", "Walker"];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const avatar = avatars[Math.floor(Math.random() * avatars.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return {
    randomName: adjective + " " + noun,
    avatar,
  };
}

function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      member: {
        user: randomUser(),
        color: randomColor(),
      },
    };
  }

  componentDidMount() {
    const messages = this.state.messages;
    const member = this.state.member;
    this.drone = new window.Scaledrone("VTaxxJZu7n4nRe1I", {
      member,
    });
    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      member.id = this.drone.clientId;
      this.setState({ member });
    });
    const room = this.drone.subscribe("ChannelName1");
    room.on("message", (response) => {
      let find = messages.find((res) => res.message.id === response.id);
      if (!find) {
        messages.unshift({ member, message: response });
        this.setState({ messages });
      }
    });
  }
  sendMessage = (message) => {
    this.drone.publish({
      room: "ChannelName1",
      message: {
        message,
        member: this.state.member,
      },
    });
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Chat</h1>
        </div>
        {this.state.member && (
          <>
            <Messages
              messages={this.state.messages}
              currentMember={this.state.member}
            />
            <Input sendMessage={this.sendMessage} />
          </>
        )}
      </div>
    );
  }
}

export default App;
