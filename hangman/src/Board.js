import React, { Component } from "react";
import "./Hangman.css";

class Board extends Component {
  static defaultProps = {
    title:"Scoreboard",
    score: 0,
  };

  render() {
   return (
     <div className="board"> 
         <h1 className="board-title">{this.props.title}</h1>
        <h1 style={{fontSize:"50px"}}>{this.props.score}</h1>
     </div>
    );
  }
}

export default Board;