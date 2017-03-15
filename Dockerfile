FROM node:boron
MAINTAINER Sam Rubin "smrubin"

# Get updates and install nginx. See https://hub.docker.com/_/nginx/
ENV NGINX_VERSION 1.10.3-1~jessie
RUN apt-key adv --keyserver hkp://pgp.mit.edu:80 --recv-keys 573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62 \
  && echo "deb http://nginx.org/packages/debian/ jessie nginx" >> /etc/apt/sources.list \
  && apt-get update \
  && apt-get install --no-install-recommends --no-install-suggests -y \
            ca-certificates \
            nginx=${NGINX_VERSION} \
            nginx-module-xslt \
            nginx-module-geoip \
            nginx-module-image-filter \
            nginx-module-perl \
            nginx-module-njs \
            gettext-base \
  && rm -rf /var/lib/apt/lists/*
# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
  && ln -sf /dev/stderr /var/log/nginx/error.log

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
# RUN useradd nginx
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
