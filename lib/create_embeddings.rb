embedding_model = "text-search-curie-doc-001"

filename = ARGV[0]
reader = PDF::Reader.new(filename)

CSV.open("book_embeddings.csv", "w") do |csv|
  csv << ["title", "content", "total_tokens", *(0..4095).to_a]

  reader.pages.each_with_index do |page, index|
    if not page.text.blank?
      response = HTTP
        .headers(:accept => "application/json")
        .auth("Bearer #{ENV['OPENAI_API_KEY']}")
        .post("https://api.openai.com/v1/embeddings", :json => {
            :model => embedding_model,
            :input => page.text,
        })
        .body
      result = JSON.parse(response);

      embeddings = result["data"][0]["embedding"]
      tokens = result["usage"]["total_tokens"]

      csv << ["Page #{index + 1}", page.text, tokens, *embeddings]
    end
  end
end