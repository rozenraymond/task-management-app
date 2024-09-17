FROM node:18-alpine as build

RUN apk add --no-cache yarn

WORKDIR /app

# Copy root package.json, yarn.lock
COPY package.json yarn.lock ./

# Copy all package.json files from workspaces
COPY apps/web/package.json ./apps/web/
COPY packages/validation/ ./packages/validation/

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY apps/web/ ./apps/web/

# Build the web app
WORKDIR /app/apps/web
RUN yarn build

FROM nginx:stable-alpine

COPY --from=build /app/apps/web/dist /usr/share/nginx/html

COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]