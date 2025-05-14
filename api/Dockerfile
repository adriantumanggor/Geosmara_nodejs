FROM node:18-alpine

# Set working directory
WORKDIR /app

# Use a non-root user for better security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy package.json and package-lock.json first (better layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Change ownership to non-root user
RUN chown -R appuser:appgroup /app

# Use non-root user
USER appuser

# Expose port (matches the one in docker-compose.yml)
EXPOSE 3000

# Command to run when container starts in development mode
CMD ["npm", "run", "dev"]