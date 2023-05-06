require "http"

class Api::V1::QuestionController < ApplicationController
    protect_from_forgery with: :null_session

    def index
        question = params[:question]

        result = HTTP
            .headers(:accept => "application/json")
            .auth("Bearer #{ENV['OPENAI_API_KEY']}")
            .post("https://api.openai.com/v1/chat/completions", :json => {
                :model => "gpt-3.5-turbo",
                :messages => [{ role: "user", content: question }],
            })
            .body
        answer = JSON.parse(result)["choices"][0]["message"]["content"]

        render json: {answer: answer}
    end
end
