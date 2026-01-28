# Build stage - optimized for low memory
FROM node:20-alpine AS builder
WORKDIR /app

# Set memory limits for build process
ENV NODE_OPTIONS="--max-old-space-size=1024"

# Install dependencies first for better caching
COPY package.json package-lock.json ./
RUN npm ci --silent --no-audit --no-fund --legacy-peer-deps

# Copy source code and build with memory optimization
COPY . .
RUN npm run build

# Production stage - minimal image
FROM node:20-alpine AS runner
WORKDIR /app

# Install minimal dependencies
RUN apk add --no-cache wget dumb-init

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set production environment with memory limits
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--max-old-space-size=512 --max-semi-space-size=128"

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Use dumb-init for proper signal handling and start the application
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
