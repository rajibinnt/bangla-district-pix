# -------- Build Stage --------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Use install instead of ci
RUN npm install

COPY . .
RUN npm run build

# -------- Production Stage --------
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
