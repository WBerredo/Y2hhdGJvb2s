## Setup 

Check the [live version](https://wberredo-chatbook.herokuapp.com/) or set it up locally as below:

1. Create and fill in `.env` passing `OPENAI_API_KEY`. Ex:

```
OPENAI_API_KEY=sk-xxx
```

2. Install [Ruby and Rails](https://guides.rubyonrails.org/getting_started.html#creating-a-new-rails-project-installing-rails).


3. Install Ruby dependencies

```
bundle install
```

4. Install postgres. For Mac users:

```
brew install postgresql
```

5. Generate the embeddings for GPT-3 from a pdf file

```
rails r lib/create_embeddings.rb yourfile.pdf
```

6. Create your database and the needed tables

```
rails db:migrate
```
## Run locally

1. Run your Rails app:

```
rails s
```

2. On another tab, run Webpack dev server
```
bin/webpack-dev-server
```

3. Acess the URL displayed on the first step and start questioning!

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License
MIT