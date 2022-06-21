FROM node 

WORKDIR /
ADD package.json package.json
ADD package-lock.json package-lock.json
RUN npm install --save
RUN ls node_modules
CMD ["node","src/main.js"]
