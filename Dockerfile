FROM nginx:latest

# Copy the static HTMLs to the nginx directory
COPY dist /usr/share/nginx/html

# Copy the nginx configuration template to the nginx config directory
COPY nginx/nginx-custom.conf /etc/nginx/conf.d/nginx-custom.conf

EXPOSE 80

STOPSIGNAL SIGQUIT

# Substitute the environment variables and generate the final config
CMD envsubst < /etc/nginx/conf.d/nginx-custom.conf > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'