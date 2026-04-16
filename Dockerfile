FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g http-server
EXPOSE 5173
CMD ["http-server", "dist", "-p", "5173", "-a", "0.0.0.0", "--proxy", "http://localhost:5173?"]
