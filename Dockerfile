# base alpine image
FROM alpine

RUN apk add --update nodejs nodejs-npm

ENV PORT 8080 \
   HOST 0.0.0.0

COPY package*.json ./

RUN npm install --only=production

# Copy local nuxt code to the container
COPY . .

# Build production app
RUN npm run build

# Start the service
CMD npm start