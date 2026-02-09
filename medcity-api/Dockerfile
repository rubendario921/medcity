# Use image from the official Node.js repository
FROM node:22-alpine

# Set the working directory
WORKDIR /usr/src/app

#Copy package.json and package-lock.json
COPY package*.json ./

#Install dependencies
RUN corepack enable pnpm && pnpm install

#Copy the rest of the application
COPY . .

#Build the application
RUN pnpm run build

#Expose the port
EXPOSE 3000

#Run the app
CMD ["pnpm", "run", "start"]

