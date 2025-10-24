# HW_1: MOVIE CATALOG

## Автор
**ФИО:** Пикулева Стефания Дмитриевна, БПИ233 
**TG**: @stefashkka


## Инструкция по запуску

1. Установить зависимости:
```bash
npm install
```

2. Запустить проект:
```bash
npm run dev
```

## Дополнительная функциональность для 9-10 баллов

#### 1. **Система аутентификации**
- Полноценная регистрация и авторизация пользователей
- Валидация форм:
  - Username минимум 3 символа
  - Email с проверкой формата через regex
  - Password минимум 6 символов
- Обработка ошибок с отображением в UI

#### 2. **Context API + Custom Hooks**
- `AuthContext` для глобального состояния аутентификации
- Custom hook `useAuth()` для удобного доступа к контексту
- Централизованное управление пользователем и состоянием авторизации

#### 3. **React Router**
- Полноценная маршрутизация приложения
- Защита роутов (требуется авторизация)
- Программная навигация через `useNavigate`

#### 4. **localStorage с персистентностью**
- Сохранение пользователей
- Управление сессиями
- Избранное для каждого пользователя (ключ: `multipoisk_favorites_{userId}`)
- Синхронизация избранного при загрузке каталога

#### 5. **Архитектура Services Layer**
- `auth.service.ts` - логика регистрации/авторизации/выхода
- `fav.service.ts` - управление избранным (добавление, удаление, проверка)
- `storage.service.ts` - универсальная работа с localStorage
- Разделение бизнес-логики и UI

#### 6. **Улучшенный UX**
- Header с профилем пользователя и кнопкой выхода
- Layout компонент для единообразия страниц

---

## Маршрутизация приложения

| Путь | Компонент | Описание |
|------|-----------|----------|
| `/` | `Navigate` → `/login` | Главная страница с редиректом |
| `/login` | `LoginPage` | Страница авторизации |
| `/register` | `RegisterPage` | Страница регистрации |
| `/catalog` | `CatalogPage` | Каталог фильмов с поиском и фильтрами |
| `*` | `Navigate` → `/login` | Обработка несуществующих маршрутов (404) |



## Структура проекта

```
src/
├── components/
│   ├── auth/
│   │   ├── loginForm/LoginForm.tsx
│   │   └── registerForm/RegisterForm.tsx
│   ├── layout/
│   │   └── header/Header.tsx
│   └── ui/
│       ├── button/Button.tsx
│       ├── filter/Filter.tsx
│       ├── movieCard/MovieCard.tsx
│       ├── search/SearchField.tsx
│       └── toggle/Toggle.tsx
├── context/
│   └── AuthContext.tsx
├── data/
│   └── data.ts
├── hooks/
│   └── useAuth.ts
├── pages/
│   ├── auth/
│   │   ├── login/LoginPage.tsx
│   │   └── register/RegisterPage.tsx
│   ├── catalog/CatalogPage.tsx
│   └── Layout.tsx
├── services/
│   ├── auth.service.ts
│   ├── fav.service.ts
│   └── storage.service.ts
├── types/
│   ├── auth.ts
│   └── movie.ts
├── utils/
│   └── constants.ts
├── App.tsx
└── main.tsx
```

---

## Структура localStorage

```javascript
localStorage:
        "multipoisk_users" - [{id, username, email, password}]
        "multipoisk_current_session" - "userId"
        "multipoisk_favorites_{userId}" - [movies]
```

Каждый пользователь имеет собственный список избранного, что обеспечивает персонализацию.


