# Frontend application for IPSENH

[![License:EUPL](https://img.shields.io/badge/License-EUPLv.1.2-brightgreen.svg)](https://opensource.org/licenses/EUPL-1.2)
![test frontend](https://github.com/WesleyKlop/journali-frontend/workflows/test%20frontend/badge.svg)
![deploy frontend](https://github.com/WesleyKlop/journali-frontend/workflows/deploy%20frontend/badge.svg)
![deploy storybook](https://github.com/WesleyKlop/journali-frontend/workflows/deploy%20storybook/badge.svg)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=WesleyKlop/journali-frontend&identifier=251608610)](https://dependabot.com)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/ede859d2301a44cead35302eaec1afaf)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=WesleyKlop/journali-frontend&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/ede859d2301a44cead35302eaec1afaf)](https://www.codacy.com?utm_source=github.com&utm_medium=referral&utm_content=WesleyKlop/journali-frontend&utm_campaign=Badge_Coverage)

This is the repository containing the front end of the Journali application.

[Component library](https://wesleyklop.github.io/journali-frontend/)

## Getting started

First, you need to clone the repository

```shell script
git clone git@github.com:wesleyklop/journali-frontend.git
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
