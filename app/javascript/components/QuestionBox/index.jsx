import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MOST_ASKED_QUESTIONS } from "./utils";
import "./style.css";

export const QuestionBox = () => {
  const [question, setQuestion] = useState("");
  const [searching, setSearching] = useState(false);

  const { data, isFetching } = useQuery({
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
    enabled: searching,
  });
  const { answer } = data || { answer: "" };

  const onChange = (e) => {
    setQuestion(e.target.value);
    setSearching(false);
  };

  const onClickOnMostAskedQuestion = (question) => {
    setQuestion(question);
    setSearching(true);
  };

  return (
    <div className="content">
      <div className="question-container">
        <input
          type="text"
          placeholder="Why die with zero?"
          className="input-question"
          value={question}
          onChange={onChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              setSearching(true);
            }
          }}
        />
        <button
          className={`search ${isFetching ? "searching" : ""}`}
          onClick={() => setSearching(true)}
        >
          {isFetching ? "Searching..." : "Search"}
        </button>
      </div>
      <div className={`answer-container ${!answer ? "hide" : ""}`}>
        <div>{answer}</div>
      </div>

      <div className="frequent-questions">
        <h2>Frequent Questions</h2>

        <ul>
          {MOST_ASKED_QUESTIONS.map((question, i) => (
            <li key={`question-${i}`}>
              <a onClick={() => onClickOnMostAskedQuestion(question)}>
                {question}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
