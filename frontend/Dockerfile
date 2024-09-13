
FROM node:20-alpine
WORKDIR /app/frontend
COPY package*.json ./
RUN yarn 
COPY . .
EXPOSE 5173
CMD yarn dev