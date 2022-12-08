FROM node:14-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN yarn
ADD . .
RUN yarn build
CMD ["node", "./dist/main.js"]