filename = ARGV[0]

reader = PDF::Reader.new(filename)

CSV.open("#{filename}_embeddings.csv", "w") do |csv|
  csv << ["title", "content"]

  reader.pages.each_with_index do |page, index|
    if not page.text.blank?
      csv << ["Page #{index + 1}", page.text]
    end
  end
end