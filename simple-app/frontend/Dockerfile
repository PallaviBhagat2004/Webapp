# ---------- Stage 1: Build the React app ----------
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build production bundle
COPY . .
RUN npm run build

# ---------- Stage 2: Serve with Nginx ----------
FROM nginx:alpine

# Copy built files from previous stage to nginx public folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 (default nginx port)
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
