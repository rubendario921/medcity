# Stage 1: Build
FROM node:22-alpine AS build
WORKDIR /usr/src/app
RUN corepack enable pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm run build --configuration=production

# Stage 2: Serve
FROM nginx:alpine
COPY --from=build /usr/src/app/dist/medcity-web/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
