# jenosize_api
jenosize_api is a test for backend skill NodeJS, Express JS

## Installation
Must have NodeJs and NPM into your computer before running script.

First install packages
```bash
npm install
```

Second runnig api 
```bash
npm start
```

## API Documentation

1. Find Restaurant API
```
curl --location --request GET 'http://[YourHostName]:3000/api/search/?search=[TextInput]'
```

2. 24Game API
```
curl --location --request POST 'http://[YourHostName]:3000/api/game/twentyfour' \
--header 'Content-Type: application/json' \
--data-raw '{
    "numberA": [integer 1 - 9],
    "numberB": [integer 1 - 9],
    "numberC": [integer 1 - 9],
    "numberD": [integer 1 - 9]
}'
```

3. XO AI API 
```
curl --location --request POST 'https://jenozise.herokuapp.com/api/game/xo' \
--header 'Content-Type: application/json' \
--data-raw '{
    "newBoard": ["o","o",2,3,"x",5,6,7,"x"],
    "player": "o"
}'
```