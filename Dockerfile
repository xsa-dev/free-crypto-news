FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Install supervisor and cron for archive scheduling
RUN apt-get update && apt-get install -y supervisor cron && rm -rf /var/lib/apt/lists/*

# Create directories for logs
RUN mkdir -p /var/log/supervisor && chmod -R 755 /var/log/supervisor

# Copy supervisor and cron configs
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY app-cron /etc/cron.d/app-cron
COPY entrypoint.sh /entrypoint.sh

# Setup cron
RUN chmod 0644 /etc/cron.d/app-cron
RUN crontab /etc/cron.d/app-cron

# Make entrypoint executable
RUN chmod +x /entrypoint.sh

ENV PORT=3001
EXPOSE 3001

ENTRYPOINT ["/entrypoint.sh"]
