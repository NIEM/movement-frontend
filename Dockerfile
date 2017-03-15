FROM node:boron
MAINTAINER Sam Rubin "smrubin"

# Get updates and install nginx
RUN apt-get update
RUN apt-get install -y nginx

# Set npm env variables to speed up npm install
ENV NPM_CONFIG_LOGLEVEL warn
ENV NPM_CONFIG_PROGRESS false
ENV NPM_CONFIG_SPIN false

# Install bower
RUN npm install -g bower

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install
COPY bower.json /usr/src/app/
RUN bower install --allow-root

# Copy custom nginx config
RUN useradd nginx
COPY /nginx/nginx.conf /etc/nginx/nginx.conf

# Bundle app source
COPY . /usr/src/app

# Build the app
RUN npm run build

# Copy to nginx dir
RUN rm -rf /var/www/html
RUN cp -a /usr/src/app/dist/client/. /var/www

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
