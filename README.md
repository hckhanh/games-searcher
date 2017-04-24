# Project Title

[![Build Status](https://travis-ci.org/hckhanh/games-searcher.svg?branch=master)](https://travis-ci.org/hckhanh/games-searcher)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/hckhanh/5)

A search tool for gamers who love best prices

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* [Node.js](https://nodejs.org/en/) 7.7.1 or above
* [isthereanydeal.com](https://isthereanydeal.com/) api
* [openexchangerates.org](https://openexchangerates.org/) api

### Installing

1. Clone the project
1. You will need to setup **environment variables**. Some API keys are **confidential**, you need to get them by yourself

|     Variable    | Description                                                                    |
|:---------------:|--------------------------------------------------------------------------------|
|   ITAD_API_KEY  | [isthereanydeal.com](https://isthereanydeal.com/)                              |
| FACEBOOK_APP_ID | Additional, I use Facebook service to use some plugins to share and track data |
|    OER_APP_ID   | [openexchangerates.org](https://openexchangerates.org/)                        |
|     APP_URL     | http://localhost:3000                                                          |
|    APP_TITLE    | Games Searcher                                                                 |
| APP_DESCRIPTION | A search tool for gamers who love best prices                                  |
|    APP_IMAGE    | http://localhost:3000/cover.png                                         |

### Run the project in development mode

```bash
npm i
npm run dev
```

## Running the tests

```bash
npm test
```

> For now, I just cover the testing for API of the application on the server side

## Build

Simply run

```bash
npm run build
```

But you will need to setup these environment variables for production:

|      Variable     | Description                                       |
|:-----------------:|---------------------------------------------------|
|     APP_TITLE     | Games Searcher                                    |

## Deployment

Currently, I am using Heroku to deploy the production app. You need to change these environment variables in production stage

|     Variable    | Description                                                    |
|:---------------:|----------------------------------------------------------------|
|   ITAD_API_KEY  | [isthereanydeal.com](https://isthereanydeal.com/)              |
|    OER_APP_ID   | [openexchangerates.org](https://openexchangerates.org/)        |
| FACEBOOK_APP_ID | Use the production app id of Facebook API                      |
|    APP_TITLE    | Games Searcher                                                 |
|     APP_URL     | The root url of the application                                |
| APP_DESCRIPTION | A search tool for gamers who love best prices                  |
|    APP_IMAGE    | The url of the cover image when user share the app to Facebook |

I am using [Opbeat](https://opbeat.com/) service to track error from both front-end and backend sides.
So there are additional apis need to be set:

|       Variable       | Description                            |
|:--------------------:|----------------------------------------|
|     OPBEAT_ORG_ID    | The id of organization from Opbeat     |
|  OPBEAT_SECRET_TOKEN | Secret token of organization           |
| OPBEAT_SERVER_APP_ID | App id of Node.js app from Opbeat      |

## Built With

* [Webpack 2](https://webpack.js.org/) - The assets bundle tool

## Versioning

I use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/hckhanh/games-searcher/tags).

## Author

* **Khanh Hoang** - *Initial work* - [hckhanh](https://github.com/hckhanh)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
