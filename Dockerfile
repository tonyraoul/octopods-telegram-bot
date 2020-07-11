FROM ruby:2.7.1
RUN apt-get update -qq && apt-get install -y nodejs
RUN mkdir /myapp
WORKDIR /myapp
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
RUN bundle install
COPY . /myapp

RUN rake telegram:bot:poller
EXPOSE 3000

# Start the main process.
CMD ["rails", "s", "-b", "0.0.0.0"]