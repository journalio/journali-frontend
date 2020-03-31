# Front end apllication for IPSEN

[![License:EUPL](https://img.shields.io/badge/License-EUPLv.1.2-brightgreen.svg)](https://opensource.org/licenses/EUPL-1.2)
![Integration](https://github.com/journalio/frontend/workflows/web/badge.svg)
![Deployment](https://github.com/journalio/frontend/workflows/Publish%20Api%20Docker%20Image/badge.svg)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=journalio/frontend)](https://dependabot.com)
[![Bors enabled](https://bors.tech/images/badge_small.svg)](https://app.bors.tech/repositories/23668)

This is the repository containing the front end of the Journali application.

## Getting started

First, you need to clone the repository

```shell script
git clone git@github.com:journalio/frontend.git
```

Second, you need to install the dependencies:

```shell script
yarn install
```

To start webpack watching your files:

```shell script
yarn watch:dev
```

For other scripts, check the `package.json` file.  
They are generally in the following format:

```shell script
yarn $command:$type # Examples:
yarn lint:fix # Runs the linters in fix mode
yarn build:prod # Create production build
```

# Building the docker image

```shell script
docker build .
```
