import React, { Component } from "react";
import {randomWord} from "./data.js";
import "./Hangman.css";
import Board from "./Board";
import img0 from "./0.jpeg";
import img1 from "./1.jpeg";
import img2 from "./2.jpeg";
import img3 from "./3.jpeg";
import img4 from "./4.jpeg";
import img5 from "./5.jpeg";
import img6 from "./6.jpeg";

class Game extends Component {
    static defaultProps = {
        images: [img0, img1, img2, img3, img4, img5, img6]
      };
    constructor(props) {
        super(props);
        let i=Math.floor(Math.random()*100);
        let len=randomWord(i).word.length;
        let str="✨";
        for(let i=0; i<len-1;i++){
          str += "✨";
            }
        this.state = { guessedWrong: 0 , word : randomWord(i).word,definition:randomWord(i).definition,visible:0,str:str,bool:true,losses:0,wins:0,message:"You LOSE!!!"};
        this.startGame = this.startGame.bind(this);
        this.makeVisible=this.makeVisible.bind(this);
        this.check = this.check.bind(this);
      }
 
      startGame(){
        let i=Math.floor(Math.random()*100);
        var len=randomWord(i).word.length - 1;
         let str="✨";
          for(let i=0; i<len;i++){
            str += "✨";
              }
          
        this.setState({
            guessedWrong: 0,
            word : randomWord(i).word,
            definition:randomWord(i).definition,
            visible:0,
            str:str,
            bool:true
          });
      }
      makeVisible(){
        
        this.setState({
            visible:1,
          });
      }
      check(letter){
        let ltr = letter.target.value;
     
        let arr = this.state.word.split('');
        let arr2 = this.state.str.split('');
        for(let i=0;i<arr.length;i++){
            if(arr[i]===ltr){
                arr2[i]=ltr;
            }
        }
        let str=arr2.join("");
        let count=this.state.guessedWrong;
        let bool=true;
        let l=this.state.losses;
        let w=this.state.wins;
        let message;
        if(this.state.word==str){
        
            bool=false; 
           w++; 
           message="You WON!!!";
        }
        if(this.state.str==str){
            
              if(count==5){
                  bool=false; 
                  count++;   
                  l++;  
                  message="You LOSE!!!"   ;
              }
              else{
                count++;
              }
        }
        this.setState({
            str:str,
            guessedWrong:count,
            bool:bool,
            losses:l,
            wins:w,
            message:message
        })
      }

      generateButtons() {
        return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
          <button
            key={ltr}
            value={ltr}
            className="button"
            onClick={this.check}
          >
            {ltr}
          </button>
        ));
      }
  render() {

 const buttons=this.generateButtons();
    return (
     <div>
         <div className="grid" style={{width:"400px"}}>
             <Board title="Wins" score={this.state.wins}/>
         </div>


         <div className="grid" style={{width:"700px"}}>
             <img className="hangImg" src={this.props.images[this.state.guessedWrong]}/>
             <h2 >Guessed wrong  : {this.state.guessedWrong}</h2>
             <h2 style={{opacity:this.state.visible}}>HINT : {this.state.definition}</h2>
             <h1 >{this.state.str}</h1>

             <h1>
                
             {this.state.bool ? buttons : this.state.message}</h1>
             <div className="solaGetBezdim" >
             <button className="BTN yellow" onClick={this.makeVisible} >HINT</button>
             <button className="BTN pink" onClick={this.startGame} >Restart</button>
             </div>
           
         </div>


         <div className="grid" style={{width:"400px"}}>
             <Board title="Losses" score={this.state.losses}/>
         </div>

     </div>
    );
  }
}

export default Game;
