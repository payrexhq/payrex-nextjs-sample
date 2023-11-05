# Install Stage

ARG CONTAINER_IMAGE
FROM $CONTAINER_IMAGE AS deps

ARG NODE_ENV

# Disable anonymous telemetry of nextjs: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=$NODE_ENV

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

# ========================================================================
# Build stage
# ========================================================================
ARG CONTAINER_IMAGE
FROM $CONTAINER_IMAGE AS builder

ARG NODE_ENV

# Disable anonymous telemetry of nextjs: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED=1
# ENV NEXT_PUBLIC_DASHBOARD_API_BASE_URL=/api
ENV NODE_ENV=$NODE_ENV

WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

# ========================================================================
# Deployment stage
# ========================================================================
ARG CONTAINER_IMAGE
FROM $CONTAINER_IMAGE AS deployment

ARG NODE_ENV

# Disable anonymous telemetry of nextjs: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "run", "start"]