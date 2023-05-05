import React from "react";
import "./style.css";

export const Home = () => {
  return (
    <div className="container">
      <div className="title">
        <h1>Ask anything about the Dark Tower!</h1>
      </div>
    
      <div className="content">
        <input
          type="text"
          placeholder="What is the Dark Tower?"
          className="input-question"
        />
        <button className="search">Search</button>
      </div>
    </div>
  );
};
