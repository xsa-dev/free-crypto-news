#!/bin/bash
# Entrypoint script for Free Crypto News

set -e

echo "🚀 Starting Free Crypto News..."

# Start supervisor in background to begin Next.js startup
echo "📦 Starting supervisor (Next.js will start in background)..."
/usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf &
SUPERVISOR_PID=$!

# Wait for API to be ready (Next.js needs time to start)
echo "⏳ Waiting for API to be ready..."
MAX_RETRIES=60
RETRY_INTERVAL=2
API_READY=false

for i in $(seq 1 $MAX_RETRIES); do
    if curl -sf http://localhost:3001/api/health > /dev/null 2>&1; then
        echo "✅ API is ready!"
        API_READY=true
        break
    fi
    if ! kill -0 $SUPERVISOR_PID 2>/dev/null; then
        echo "❌ Supervisor died unexpectedly"
        exit 1
    fi
    echo "  Attempt $i/$MAX_RETRIES - waiting ${RETRY_INTERVAL}s..."
    sleep $RETRY_INTERVAL
done

if [ "$API_READY" = false ]; then
    echo "⚠️ API healthcheck failed after $MAX_RETRIES attempts"
fi

# Run initial archive collection
echo "📰 Running initial archive collection..."
node /app/scripts/archive/collect.js >> /var/log/archive.log 2>&1 || echo "⚠️ Initial archive collection failed, will retry on schedule"

echo "✅ Initial collection complete."

# Wait for supervisor to continue running
wait $SUPERVISOR_PID
