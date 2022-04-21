# Docker Deployment for Gladiators.finance

## Setup

Download and install docker and docker-composer and make sure you docker login with the credentials provided to the team before you continue.

## Starting application

We are now using .env.* configuration files to determine which envs we will be working with, therefore now you should start you application by specifying which env you'd like to work with.
If none specified we will use `.env` config file.

```shell
yarn start:qa
yarn start:testnet
```

## Environment files

- **.env** will be used as your dev environment and will be picked up as default
- **.env.qa** contains mainnet configurations.
- **.env.testnet** contains testnet configurations.

## Deploy Testnet

This environment is available on testnet chain in the [Testnet](https://testnet.gladiators.finance) address which is not yet available publicaly.

Deployment consists in 3 parts:
- Build and optmize the code
- Create the docker image locally
- Push the newly created image to dockerhub

In the `frontend` project execute the following (make sure you proceed to the next phase only if success on each step):

```shell
yarn build:testnet
yarn docker:testnet:build
yarn docker:testnet:push
```

Once the image built by `yarn docker:testnet:push` is pushed to DockerHub, jump into the cloud server for deploy, make sure you download the image before you compose up:
```shell
ssh gladiators@216.238.70.132
gladiators@dev:~$ cd devops/
gladiators@dev:~/devops$ sudo docker pull gladiatorsfinance/frontend:testnet
gladiators@dev:~/devops$ sudo docker-compose up &
```

You can always check if you have the correct build by checking in the [frontend/build/index.html](build/index.html). 
We should have a `c=97`, which corresponds to the chainId generated in the build process.
```html
<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico?c=%REACT_APP_CHAIN_ID%" />
```


## Deploy QA (mainnet)

This environment is available on mainnet in the [QA](https://qa.gladiators.finance) address which is not yet available publicaly.

Deployment consists in 3 parts:
- Build and optmize the code
- Create the docker image locally
- Push the newly created image to dockerhub

In the `frontend` project execute the following (make sure you proceed to the next phase only if success on each step):

```shell
yarn build:qa
yarn docker:qa:build
yarn docker:qa:push
```

Once the image built by `yarn docker:qa:push` is pushed to DockerHub, jump into the cloud server for deploy, make sure you download the image before you compose up:
```shell
ssh gladiators@216.238.70.132
gladiators@dev:~$ cd devops/
gladiators@dev:~/devops$ sudo docker pull gladiatorsfinance/frontend:qa
gladiators@dev:~/devops$ sudo docker-compose up &
```

You can always check if you have the correct build by checking in the [frontend/build/index.html](build/index.html). 
We should have a `c=56`, which corresponds to the chainId generated in the build process.
```html
<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico?c=%REACT_APP_CHAIN_ID%" />
```

## Deploy Production

This environment is available on mainnet in the [gladiators.finance](https://gladiators.finance) address which is PUBLICLY AVAILABLE.

Deployment consists in 3 parts:
- Build and optmize the code
- Create the docker image locally
- Push the newly created image to dockerhub

In the `frontend` project execute the following (make sure you proceed to the next phase only if success on each step):

```shell
yarn build:production
yarn docker:production:build
yarn docker:production:push
```

Once the image built by `yarn docker:testnet:push` is pushed to DockerHub, jump into the cloud server for deploy, make sure you download the image before you compose up:
```shell
ssh gladiators@216.238.70.132
gladiators@dev:~$ cd devops/
gladiators@dev:~/devops$ sudo docker pull gladiatorsfinance/frontend:production
gladiators@dev:~/devops$ sudo docker-compose up &
```

You can always check if you have the correct build by checking in the [frontend/build/index.html](build/index.html). 
We should have a `c=56`, which corresponds to the chainId generated in the build process.
```html
<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico?c=%REACT_APP_CHAIN_ID%" />
```

