# Monorepo: run from `bridge/`: `docker build -f bridge/Dockerfile -t inbox-sms-bridge bridge`
# Standalone: run inside `bridge/`
FROM node:20-slim
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
COPY server.mjs ./
COPY lib ./lib
EXPOSE 8080
USER node
ENV PORT=8080
CMD ["node", "server.mjs"]
