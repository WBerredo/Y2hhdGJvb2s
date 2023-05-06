import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "./style.css";

export const QuestionBox = () => {
  const [question, setQuestion] = useState("Who is Stephen King?");
  const [enabled, setEnabled] = useState(false);

  const { data } = useQuery({
    queryKey: ["question", window.btoa(question)],
    queryFn: () =>
      fetch("api/v1/question", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
        }),
      }).then((res) => res.json()),
    enabled,
  });
  const { answer } = data || { answer: "" };

  const onChange = (e) => {
    setQuestion(e.target.value);
    setEnabled(false);
  };

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
