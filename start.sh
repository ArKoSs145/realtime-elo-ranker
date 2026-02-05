#!/bin/bash

# Définition des couleurs pour la lisibilité
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}   🚀 Lancement de Realtime ELO Ranker   ${NC}"
echo -e "${BLUE}=========================================${NC}"

# 1. Construction de la librairie UI (Rapide et évite les bugs d'affichage)
echo -e "\n${GREEN}📦 Vérification de la librairie UI...${NC}"
pnpm run --filter ./libs/ui build

# 2. Démarrage du Serveur (Backend)
echo -e "\n${GREEN}🔌 Démarrage du Serveur NestJS (Port 3001)...${NC}"
pnpm run --filter realtime-elo-ranker-server start:dev &
SERVER_PID=$! # On capture l'ID du processus pour pouvoir l'arrêter plus tard

# Petite pause pour laisser le serveur s'initialiser
sleep 3

# 3. Démarrage du Client (Frontend)
echo -e "\n${GREEN}💻 Démarrage du Client Next.js (Port 3000)...${NC}"
pnpm run --filter realtime-elo-ranker-client dev &
CLIENT_PID=$!

# Fonction pour tout arrêter proprement avec Ctrl+C
cleanup() {
    echo -e "\n${BLUE}🛑 Arrêt de l'application...${NC}"
    kill $SERVER_PID
    kill $CLIENT_PID
    exit
}

# Intercepte la commande Ctrl+C (SIGINT)
trap cleanup SIGINT

echo -e "\n${BLUE}✅ Tout est lancé !${NC}"
echo -e "   👉 Interface : http://localhost:3000"
echo -e "   👉 API       : http://localhost:3001/api/ranking"
echo -e "${BLUE}Appuyez sur Ctrl+C pour quitter.${NC}\n"

# Garde le script actif tant que les processus tournent
wait