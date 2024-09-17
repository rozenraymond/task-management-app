FROM node:18-alpine

RUN apk add --no-cache yarn

WORKDIR /app

# Copy root package.json, yarn.lock
COPY package.json yarn.lock ./

# Copy all package.json files from workspaces
COPY apps/api/package.json ./apps/api/
COPY packages/validation/ ./packages/validation/

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY apps/api/ ./apps/api/

WORKDIR /app/apps/api

# Run any necessary build steps
RUN yarn build

EXPOSE 3000

# Define the command to run the app
CMD ["yarn", "start"]