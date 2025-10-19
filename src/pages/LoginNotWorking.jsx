import React from "react";
import "./LoginNotWorking.css";
import { NavbarComponent } from "../components/NavbarComponent";

export default function LoginNotWorking() {
  return (
    <div >
    <NavbarComponent/>
    <div className="premium-container">
      <h1 className="premium-title">🚀 Premium Apps in Progress!</h1>
      <p className="premium-message">
        Our premium apps are still cooking in the lab… 🧪  
        But don’t worry, you can enjoy all the free apps without logging in! 🎉
      </p>
      <img
        className="premium-image"
        src="https://media.giphy.com/media/3oKIPwoeGErMmaI43C/giphy.gif"
        alt="Work in progress"
      />
    </div>
    </div>
  );
}
