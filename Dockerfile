FROM node:alpine AS builder
WORKDIR /usr/src/journali-frontend
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY . .

# Set embedded environment variables
ENV VUE_APP_VERSION $GITHUB_SHA

RUN yarn build

FROM nginx:alpine
COPY --from=builder /usr/src/journali-frontend/dist /usr/share/nginx/html
