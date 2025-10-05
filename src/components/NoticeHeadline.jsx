import React from "react";
import "./NoticeHeadline.css"; // we'll define animation here

export function NoticeHeadline({ text }) {
  return (
    <div className="notice-container">
      <div className="notice-text">{text}</div>
    </div>
  );
}