FROM node:lts
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3001
CMD npm run build && npx babel client --out-dir client/dist && node server/index.js