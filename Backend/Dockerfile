
FROM node:23-alpine

WORKDIR /app

COPY package* .

RUN npm install 

COPY . .

RUN npx tsc -b 

EXPOSE 4000

CMD [ "node", "dist/index.js" ]