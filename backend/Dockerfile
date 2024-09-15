FROM node:20-alpine
WORKDIR /app/backend
COPY package*.json ./
RUN yarn
COPY ./prisma ./
RUN yarn prisma generate
COPY . .
EXPOSE 3001
CMD yarn prisma migrate dev --name init_schema && yarn dev
