FROM node:18
# Create app directory

WORKDIR /app
# Install app dependencies
# A wildcard is used to ensure both package.json AN package-lock.json are copied
# Where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are buildin your code for production
# RUN npm ci --only=production
# Bundle app source
COPY . . 

EXPOSE 3000
CMD [ "node", "bin/www" ]