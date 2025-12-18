📋 README - Sistema de Contas a Receber
🚀 Tecnologias Utilizadas

    React 18 - Biblioteca principal

    TypeScript - Tipagem estática

    Vite - Build tool e dev server

    Tailwind CSS - Estilização

    Lucide React - Ícones

    Vercel - Deploy e hosting

## 📦 Estrutura do Projeto

```text
ERP-DASHBORD-HARD/
│
├── 📁 public/
│   └── 🖼️ vite.svg
│
├── 📁 src/
│   ├── 📁 assets/                 # Imagens e recursos estáticos
│   │   ├── 🖼️ Hsoft-black.png
│   │   ├── 🖼️ Hsoft-white.png
│   │   └── 🖼️ LogoModalHsoft.png
│   │
│   ├── 📁 components/             # Componentes modulares
│   │   ├── 📁 AccountsReceivable/  # Subcomponentes de Contas a Receber
│   │   │   ├── 📁 hooks/          # Hooks específicos do módulo
│   │   │   ├── ⚛️ DataFilter.tsx
│   │   │   ├── ⚛️ DataTable.tsx
│   │   │   └── ⚛️ ...
│   │   ├── 📁 ui/                  # Componentes de UI (Shadcn/Base)
│   │   ├── 📁 LoginModal/
│   │   ├── 📁 ViewInstallmentModal/
│   │   ├── ⚛️ Navbar.tsx
│   │   └── ⚛️ ...
│   │
│   ├── 📁 contexts/               # Contextos do React (Estado Global)
│   │   ├── 🧠 ThemeContext.tsx
│   │   └── 🧠 ModalInstallmentContext.tsx
│   │
│   ├── 📁 hooks/                  # Hooks personalizados globais
│   ├── 📁 pages/                  # Páginas da aplicação
│   ├── 📁 lib/                    # Configurações de bibliotecas (Axios/Utils)
│   ├── 📁 types/                  # Definições de tipos TypeScript
│   ├── 📁 utils/                  # Funções utilitárias e constantes
│   │
│   ├── ⚛️ App.tsx                 # Componente raiz
│   ├── 🎨 index.css               # Estilos globais
│   └── ⚛️ main.tsx                # Entry point
│
├── 📄 package.json                # Dependências e scripts
├── 📄 vite.config.ts              # Configuração do Vite
├── 📄 tailwind.config.js          # Configuração do Tailwind
├── 📄 components.json             # Configuração do Shadcn/ui
├── 📄 tsconfig.json               # Configuração do TypeScript
└── 📄 vercel.json                 # Configuração de deploy
```

🛠️ Comandos Disponíveis
bash

# Instalar dependências (muito mais rápido)

pnpm install

# Iniciar o projeto para trabalhar (modo dev)

pnpm dev

# Criar a versão final para o cliente (build)

pnpm build

# Testar a versão final localmente

pnpm preview

📊 Script para Ver Estrutura do Projeto

Adicione este script no package.json:
json

{
"scripts": {
"dev": "vite",
"build": "tsc && vite build",
"preview": "vite preview",
"analyze": "tree -I 'node_modules|dist|.git' --dirsfirst"
}
}
🌐 Deploy na Vercel (Hospedagem)

Para colocar o dashboard no ar, a configuração recomendada é:

    Framework Preset: Vite

    Build Command: pnpm build

    Output Directory: dist

    Install Command: pnpm install

    Dica: O arquivo vercel.json já está configurado no projeto para garantir que as rotas do React funcionem perfeitamente sem dar erro 404 ao atualizar a página.

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
📱 Status do Projeto (O que já entregamos)
✅ Concluído (Já está funcionando):

    Dashboard Financeiro: Tabela inteligente que se adapta a PCs e Celulares.

    Gestão de Parcelas: Modais avançados para inclusão e geração automática de parcelas.

    Sistema de Temas: Troca dinâmica entre modo Claro (Light) e Escuro (Dark).

    Filtros Inteligentes: Busca por data e status das contas.

    Lógica de Negócio: Hooks customizados para cálculo de parcelas e datas.

    Estado Global: Uso de Context API para gerenciar modais e temas sem bagunça no código.

🔄 Próximas Etapas (O que vamos polir):

    Conexão com Banco de Dados: Integrar com a API real.

    Busca em Tempo Real: Filtrar clientes enquanto digita.

    Paginação: Para suportar milhares de lançamentos sem travar.

    Feedback Visual: Adicionar esqueletos de carregamento (Skeleton Loaders).

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

