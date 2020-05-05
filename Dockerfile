FROM node:alpine AS builder
WORKDIR /usr/src/journali-frontend
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY . .

# Set embedded environment variables
ARG VUE_APP_VERSION="development"

RUN yarn build

FROM nginx:alpine
COPY --from=builder /usr/src/journali-frontend/dist /usr/share/nginx/html
