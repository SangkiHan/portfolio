FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g pm2
EXPOSE 5173
CMD ["pm2-runtime", "serve", "dist", "5173", "--spa"]
