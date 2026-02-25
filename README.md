React-приложение для управления интернет-магазином с авторизацией, интернационализацией и системой настроек.

## Технологический стек

- React 18 + TypeScript
- Vite - сборщик
- Redux Toolkit + RTK Query
- Redux Persist
- Material-UI v7
- React Router v6
- i18next (ru/en)

## Запуск

`
npm install 
npm run dev
`

Приложение: http://localhost:5173

## Тестовые данные

`
Username: emilys
Password: emilyspass
`

## Структура

- app/ - инициализация (providers, router, store, theme)
- pages/ - страницы приложения
- features/ - бизнес-функции (auth, products, settings)
- entities/ - сущности (user, product)
- shared/ - общий код (api, i18n, ui)


## Возможности

- JWT в HTTP-only cookies
- Автоматический refresh токенов
- Защищенные маршруты
- Кэширование RTK Query (60/300/30 сек)
- i18n (русский/английский)
- Redux Persist (settings)
- Светлая/темная тема


## Маршруты

Публичные: /login, /register

Защищенные: /, /products, /products/:id, /profile, /settings, /logout