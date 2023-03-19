import { Component } from "react";
import React from "react";

class Input extends Component {
  state = {
    text: "",
  };

  onChange(e) {
    this.setState({ text: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ text: "" });
    this.props.sendMessage(this.state.text);
  }

  render() {
    return (
      <div className="Input">
        <form className="inputForm" onSubmit={(e) => this.onSubmit(e)}>
          <input
            onChange={(e) => this.onChange(e)}
            value={this.state.text}
            type="text"
            placeholder="Upiši poruku i pritisni POŠALJI"
          />
          <button className="sendButton">Pošalji</button>
        </form>
      </div>
    );
  }
}

export default Input;
