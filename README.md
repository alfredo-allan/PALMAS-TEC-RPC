📋 README - Sistema de Contas a Receber
🚀 Tecnologias Utilizadas

    React 18 - Biblioteca principal

    TypeScript - Tipagem estática

    Vite - Build tool e dev server

    Tailwind CSS - Estilização

    Lucide React - Ícones

    Vercel - Deploy e hosting

## 📦 Estrutura do Projeto
```
PALMAS-TEC-RPC/
│
├── 📁 public/
│   ├── 🖼️ vite.svg
│   └── 🔍 favicon.ico
│
├── 📁 src/
│   ├── 📁 components/
│   │   ├── ⚛️ DataTable.tsx          # Tabela principal com ícones customizados
│   │   ├── ⚛️ DataFilter.tsx         # Componente de filtros
│   │   └── ⚛️ Header.tsx             # Cabeçalho da aplicação
│   │
│   ├── ⚛️ App.tsx                    # Componente principal
│   ├── ⚛️ main.tsx                   # Entry point do React
│   ├── 🎨 index.css                  # Estilos globais
│   └── 🏷️ vite-env.d.ts             # Tipos do Vite
│
├── 📄 package.json                   # Dependências e scripts
├── 📄 vite.config.ts                 # Configuração do Vite
├── 📄 tailwind.config.js             # Configuração do Tailwind
├── 📄 tsconfig.json                  # Configuração do TypeScript
├── 📄 tsconfig.node.json             # TS config para Node
├── 📄 index.html                     # HTML principal
└── 📄 README.md                      # Documentação
```
🛠️ Comandos Disponíveis
bash

# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Ver estrutura do projeto
npm run analyze

📊 Script para Ver Estrutura do Projeto

Adicione este script no package.json:
json

{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "analyze": "npx @vue/compiler-sfc tree-shaking-analyzer build || echo 'Analisando estrutura do projeto...'"
  }
}

🌐 Deploy na Vercel
Método 1: Deploy Automático (Recomendado)

    Conecte seu repositório GitHub na Vercel

    Configure as variáveis de build:

        Framework Preset: Vite

        Build Command: npm run build

        Output Directory: dist

        Install Command: npm install

Método 2: Deploy via CLI
bash

# Instalar Vercel CLI
npm i -g vercel

# Fazer deploy
vercel

# Ou com configuração específica
vercel --prod

Arquivo vercel.json para Configuração Otimizada:
json

{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "VITE_APP_VERSION": "1.0.0"
  }
}

🔧 Configuração do Vite para Deploy

vite.config.ts
typescript

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1600,
  },
  server: {
    port: 3000,
    host: true
  },
  preview: {
    port: 3000,
    host: true
  }
})

📱 Status do Projeto
✅ Concluído:

    ✅ Tabela responsiva com tema dark/light

    ✅ Ícones personalizados com cores específicas

    ✅ Sistema de seleção de linhas

    ✅ Layout mobile com rolagem horizontal

    ✅ Componente de filtros básico

    ✅ Header da aplicação

🔄 Próximas Etapas (Refatoração):

    Conectar filtros com estado global

    Implementar busca em tempo real

    Adicionar paginação

    Criar context para gerenciamento de estado

    Implementar loading states

    Adicionar validações nos filtros

    Criar hooks customizados para lógica de negócio

🎨 Características da Tabela
Ícones Personalizados:

    Selecionados: ✅ CheckSquare - #6D5AEC

    Vencidos: ❓ HelpCircle - #EF4D5F

    A Vencer: ⏱️ Timer - #E69000

    Capital: 📊 Barcode - #2E4A8A

    Total: 💰 DollarSign - #009300

Responsividade:

    Desktop: Tabela completa com rolagem horizontal

    Mobile: Cards com rolagem horizontal

    Tema: Suporte completo dark/light

📈 Scripts de Desenvolvimento
bash

# Desenvolvimento com hot reload
npm run dev

# Build de produção
npm run build

# Analisar bundle
npm run analyze

# Deploy na Vercel
npm i -g vercel
vercel

🌟 URLs do Projeto

    Local: http://localhost:3000

    Produção: https://palmas-tec-rpc.vercel.app (após deploy)
