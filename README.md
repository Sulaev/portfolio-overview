This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, clone the repository
Open a terminal and run:

```bash
git clone https://github.com/Sulaev/portfolio-overview.git
cd portfolio-overview
```
Next, opening a project in VSCode

```bash
code portfolio-overview.code-workspace
```
Also, before running, don't forget to install dependencies
```bash
yarn 
```
or 
```bash
npm install
```
or 
```bash
yarn install
```

Finaly, enter
```bash
yarn dev
```
and open [http://localhost:3000/portfolio](http://localhost:3000/portfolio) with your browser to see the result.


This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

Full list of dependencies
```bash
  "dependencies": {
    "@radix-ui/react-dialog": "^1.1.6",
    "@radix-ui/react-progress": "^1.1.2",
    "@radix-ui/react-select": "^2.1.6",
    "@radix-ui/react-slot": "^1.1.2",
    "@reduxjs/toolkit": "^2.6.1",
    "axios": "^1.8.4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^12.6.3",
    "lucide-react": "^0.487.0",
    "next": "15.2.4",
    "next-themes": "^0.4.6",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-redux": "^9.2.0",
    "react-window": "^1.8.11",
    "socket.io": "^4.8.1",
    "socket.io-client": "^4.8.1",
    "sonner": "^2.0.3",
    "tailwind-merge": "^3.1.0",
    "tw-animate-css": "^1.2.5",
    "uuid": "^11.1.0",
    "vaul": "^1.1.2"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.2.4",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
```

Project structure
```bash
/src
│
├── /app               # Next.js app router
│   └── /portfolio     # Основная страница
│
├── /components        # UI компоненты
│   ├── AssetForm.tsx  # Форма добавления активов
│   ├── AssetItem.tsx  # Элемент списка активов
│   ├── AssetTable.tsx # Таблица с пагинацией
│   └── ui/            # Shadcn/ui компоненты
│
├── /constants         # Константы
│   └── cryptoList.ts  # Топ-100 криптовалют
│
├── /store             # Состояние приложения
│   ├── portfolioSlice.ts # Redux логика
│   └── store.ts       # Redux store
│
├── /lib               # Вспомогательные функции
│   ├── localStorage.ts
│   └── utils.ts       # Утилиты форматирования
```
