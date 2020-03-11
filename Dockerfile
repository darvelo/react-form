FROM node:12.2.0-alpine
RUN mkdir -p /app/frontend
COPY . /app/frontend
WORKDIR /app/frontend
RUN npm install --silent
ENV PATH /app/node_modules/.bin:$PATH
