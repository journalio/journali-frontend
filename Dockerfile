FROM node:alpine AS builder
WORKDIR /usr/src/journali-frontend
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY . ./
RUN yarn build:prod

FROM nginx:alpine
COPY --from=builder /usr/src/journali-frontend/public /usr/share/nginx/html
