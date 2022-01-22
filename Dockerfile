FROM node:14-buster-slim
WORKDIR /usr/src/app
# COPY ["package.json", "yarn.lock", "./"]
COPY package*.json yarn.lock ./
RUN yarn install
COPY . .
ENTRYPOINT [ "yarn", "start" ]