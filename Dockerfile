FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV CORE_PORT=3001
ENV PUBLIC_SITE_URL=https://oolivo.com.br
COPY package.json ./
COPY . .
RUN mkdir -p /var/lib/globaltools
EXPOSE 3000
VOLUME ["/var/lib/globaltools"]
CMD ["npm", "start"]
