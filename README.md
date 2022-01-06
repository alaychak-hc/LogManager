# LogManager

Manager that handles logging for the various internal applications

## Setup

- Create a personal access token [here](https://github.com/settings/tokens)
- Create the token with the following permissions:
  - read:packages
  - write:packages
  - delete:packages
- Inside the application that needs the logger, create a **.npmrc** file that contains the following code:

```shell
registry=https://registry.npmjs.org/
@alaychak-hc:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=ACCESS_TOKEN
```

- Replace the ACCESS_TOKEN value with the token that was generated in the first step
