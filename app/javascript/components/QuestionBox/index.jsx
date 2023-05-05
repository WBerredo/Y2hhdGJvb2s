import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import "./style.css";

export const QuestionBox = () => {
  const [question, setQuestion] = useState("");
  const [enabled, setEnabled] = useState(false);

  const { data } = useQuery({
    queryKey: ["question", window.btoa(question)],
    queryFn: () => fetch("api/v1/question").then((res) => res.json()),
    enabled,
  });
  const { answer } = data || { answer: "" };

  const onChange = (e) => {
    setQuestion(e.target.value);
    setEnabled(false);
  }

  return (
    <div className="content">
      <div className="question-container">
        <input
          type="text"
          placeholder="What is the Dark Tower?"
          className="input-question"
          value={question}
          onChange={onChange}
        />
        <button className="search" onClick={() => setEnabled(true)}>
          Search
        </button>
      </div>
      <div className="answer-container">{answer}</div>
    </div>
  );
};
