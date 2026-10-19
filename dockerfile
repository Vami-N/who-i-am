# Étape 1 : Build de l'application (Node 22 + pnpm 10)
FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@10 --activate
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
ARG VITE_SITE_URL=http://localhost:8080
ENV VITE_SITE_URL=$VITE_SITE_URL
RUN pnpm build

# Étape 2 : Image de production Nginx (Ultra-léger ~20Mo)
FROM nginx:alpine AS runner

RUN rm -rf /usr/share/nginx/html/*

# Copie des fichiers dist et de la configuration Nginx propre
COPY --from=builder /app/dist /usr/share/nginx/html
COPY deployement/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
