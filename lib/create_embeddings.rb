filename = ARGV[0]
reader = PDF::Reader.new(filename)

CSV.open("book_embeddings.csv", "w") do |csv|
  csv << ["title", "content", "total_tokens", *(0..4095).to_a]

  reader.pages.each_with_index do |page, index|
    if not page.text.blank?
      requested_embeddings = Api::V1::QuestionController.helpers.request_embeddings(page.text)

      embeddings = requested_embeddings["data"][0]["embedding"]
      tokens = requested_embeddings["usage"]["total_tokens"]

      csv << ["Page #{index + 1}", page.text, tokens, *embeddings]
    end
  end
end