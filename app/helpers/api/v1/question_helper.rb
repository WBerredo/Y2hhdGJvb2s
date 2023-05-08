module Api::V1::QuestionHelper
    def request_completion(prompt)
        response = HTTP
            .headers(:accept => "application/json")
            .auth("Bearer #{ENV['OPENAI_API_KEY']}")
            .post("https://api.openai.com/v1/completions", :json => {
                :model => "text-davinci-003",
                :temperature => 0.0,
                :max_tokens => 150,
                :prompt => prompt,
            })
            .body

        return JSON.parse(response);
    end

    def request_embeddings(input)
        response = HTTP
            .headers(:accept => "application/json")
            .auth("Bearer #{ENV['OPENAI_API_KEY']}")
            .post("https://api.openai.com/v1/embeddings", :json => {
                :model => "text-search-curie-doc-001",
                :input => input,
            })
            .body

        return JSON.parse(response);
    end

    def generate_embeddings(input)
        requested_embeddings = request_embeddings(input)
        return requested_embeddings["data"][0]["embedding"]
    end

    def calculate_similarity(question_embeddings, page_embeddings)
        return question_embeddings.dot page_embeddings
    end

    def generate_similarity_table(question_embeddings)
        csv_table = CSV.read("book_embeddings.csv", headers: true, return_headers: false).map(&:fields)
        similarity_table = []

        csv_table.each_with_index do |row, i|
            page_embeddings_array = row.drop(3).map(&:to_f) # remove title, content, total_tokens, and convert the rest to float
            page_embeddings = Numo::NArray[*page_embeddings_array]
            similarity = calculate_similarity(question_embeddings, page_embeddings)
            similarity_table.push([row[1], similarity]) # returns the content and similarity
        end

        return similarity_table
    end

    def get_base_context
        context = "Answer this as the author of the book Die with Zero, Bill Perkins. Please keep your answers to three sentences maximum, and speak in complete sentences. Context that may be useful, pulled from Die with zero. \n"

        return context
    end
end
