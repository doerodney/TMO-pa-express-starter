FROM node:17.3.1-buster

WORKDIR /app

# Copy this app files to /app/server/:
COPY server/*.js ./server/

# Copy the package files to /app/:
COPY package*.json .

# Copy the test files to /app/test/
COPY test/*.js ./test/

# Install the Node packages:
RUN npm install

ENV PORT=4000
EXPOSE $PORT

CMD ["npm",  "start"]
