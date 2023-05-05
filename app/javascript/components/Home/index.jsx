import React from "react";
import { QuestionBox } from "../QuestionBox";
import "./style.css";

export const Home = () => {
  return (
    <div className="container">
      <div className="title">
        <h1>Ask anything about the Dark Tower!</h1>
      </div>
    
      <QuestionBox />
    </div>
  );
};
