class Api::V1::QuestionController < ApplicationController
    def index
        render json: {answer: 'A ka-tet is a group of beings brought together by ka'}
    end
end
