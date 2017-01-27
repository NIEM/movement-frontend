FROM nginx
MAINTAINER Sam Rubin "srubin@deloitte.com"

COPY /nginx/nginx.conf /etc/nginx/nginx.conf
COPY /dist/client /var/www