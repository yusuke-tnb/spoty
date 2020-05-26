FROM node:9.11.2
 
RUN useradd --user-group --create-home --shell /bin/false app &&\
  npm install --global forever

WORKDIR /src

ARG APP_ENV 
ENV APP_ENV="development" 

COPY . .
RUN rm -rf /src/node_modules
RUN rm -rf /src/package-lock.json

CMD ["bash", "-c", "npm install && forever start --append -l /src/api.log /src/bin/www && tail -f /src/api.log"]
