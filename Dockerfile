# Use the official Node.js image as the base image
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy configuration files
# COPY package*.json ./
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY vite.config.js ./
COPY .eslintrc.json ./

# Install project dependencies
RUN npm install

# Copy the entire source code
COPY src/ ./src/

# Copy static assets
COPY index.html ./
COPY public/ ./public/

# Build the Vite app
RUN npm run build

# Copy the built application
COPY dist/ ./dist/

# Expose the port that the app will run on
EXPOSE 5173

# Command to run the application
CMD ["npm", "run", "dev", "--", "--host"]
