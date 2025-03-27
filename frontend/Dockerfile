FROM node:20-alpine as builder

WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install sirv-cli for serving
RUN npm i -g sirv-cli

# Copy built files from builder stage - copy the entire public directory
COPY --from=builder /app/public ./public

# Ensure proper permissions for the files
RUN chmod -R 755 ./public

EXPOSE 5000

# Start the application with the correct base path
CMD ["sirv", "public", "--host", "0.0.0.0", "--port", "5000", "--single", "--dev"]