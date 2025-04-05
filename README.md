This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000/portfolio](http://localhost:3000/portfolio) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

Структура проекта
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
