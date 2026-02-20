# Stage 1: Build the React frontend
FROM node:20-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./ 
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the application with Express
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./ 
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY server.ts .
COPY tsconfig.json .
COPY .env.example .

# Install tsx for running server.ts directly
RUN npm install -g tsx

EXPOSE 3000

CMD ["tsx", "server.ts"]
