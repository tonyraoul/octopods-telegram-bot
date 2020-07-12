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
```
  ./bin/run
```

#### Testing
- Setup all dependencies and bundles
```
  ./bin/setup
```
- Run rspec test suite
```
  rspec
```

### Areas that need Improvements
- [ ] Make the app realtime with graphql subscriptions/Action cable implementation.
- [ ] Write more tests.
- [ ] Improve Design.
- [ ] Enable authentication.
- [ ] Add SSL certificate to replace poller with webhooks.
