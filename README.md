# README

### Description
Fullstack ruby task for octopods.

#### Setup
- Retrive new bot username and token from telegram with [@botFather](https://telegram.me/BotFather)
- run
```
   ./bin/rails credentials:edit --environment development
```
- Add your tokens as the following format
```
   telegram:
    bot:
      token: TOKEN
      username: SomeBot
```

#### Run locally with docker
```
  docker-compose up --build
```

#### Run natively
- Make sure that redis is running on `localhost:6379/1`
- run `./bin/run` command

#### Testing
- Setup all dependencies and bundles
```
  ./bin/setup
```
- Run rspec test suite
```
  rspec
```

### Area that needs Improvement
- [x] Make the app realtime with graphql subscriptions/Action cable implementation. (Added on 27 July 2020)
- [] Write more tests.
- [] Improve Design.
- [] Enable authentication.
- [] Add SSL certificate to replace poller with webhooks.
