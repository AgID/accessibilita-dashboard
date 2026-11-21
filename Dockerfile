# Dockerfile — build of the static site for the Devops-AWS "static" deploy
#
# The same image is deployed to coll and prod: no environment specific value is used here.
# Environment specific values are in public/config.js.j2, rendered at deploy time.

# ── Build ────────────────────────────────────────────────────────────────────
# linux/amd64: package-lock.json contains only the linux-x64 native binaries of rollup.
# No effect on the Jenkins agents (x86_64); emulated on ARM machines (e.g. Apple Silicon).
# The output (static files) does not depend on the platform.
FROM --platform=linux/amd64 node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

# ── Local preview (optional): docker compose --profile preview up --build ──────
FROM nginx:1.29-alpine AS preview
COPY nginx-preview.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/client /usr/share/nginx/html

# ── Site: files published to S3/CloudFront by the pipeline ───────────────────
# The Routify Vite plugin writes the client build to dist/client.
FROM scratch AS site
COPY --from=build /app/dist/client /site
