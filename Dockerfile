# Estágio de Build (Para Produção e Desenvolvimento)
FROM node:20-alpine AS builder

WORKDIR /app=
COPY package.json ./
COPY package-lock.json ./ 
# --frozen-lockfile é um bom hábito para builds determinísticos
RUN npm install --frozen-lockfile --production=false=
COPY . .
RUN npm run build 

# ----------------------------------------------------------------------------------
# Estágio de Desenvolvimento (Para Rodar Localmente com Hot-Reload via Docker Compose)
# ----------------------------------------------------------------------------------
FROM node:20-alpine AS development

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install --frozen-lockfile --production=false
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:dev"]


# ----------------------------------------------------------------------------------
# Estágio de Produção (Versão Otimizada)
# ----------------------------------------------------------------------------------
FROM node:20-alpine AS production

ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /app
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist
EXPOSE ${PORT}
CMD ["node", "dist/main"]
