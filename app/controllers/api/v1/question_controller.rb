class Api::V1::QuestionController < ApplicationController
    protect_from_forgery with: :null_session

    def index
        question = params[:question]

        if (not question.end_with?("?"))
            question += "?"
        end

        db_question = Question.find_by(question: params[:question])
        if db_question
            return render json: {answer: db_question.answer}
        end

        question_embeddings = Numo::NArray[*helpers.generate_embeddings(question)]

        csv_table = CSV.read("book_embeddings.csv", headers: true, return_headers: false).map(&:fields)
        similarity_table = helpers.generate_similarity_table(question_embeddings)

        sorted_table = similarity_table.sort {|a,b| b[1] <=> a[1]} # sort by similarity
        chosen_sections = sorted_table[0...4]

        prompt = helpers.get_base_context
       
        prompt += chosen_sections.map {|section| section[0]}.join("\n")
        prompt += "\n\n#{question}"

        result = helpers.request_completion(prompt)
        answer = result["choices"][0]["text"]

        question_to_be_saved = Question.create(question: question, answer: answer, context: prompt)
        question.save
        
        render json: {answer: answer}
    end
end
