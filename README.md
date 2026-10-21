# MOI MARKET PRO — Система управления

Новый стартовый проект: адаптивная панель управления, PWA для добавления на главный экран и GitHub Actions для сборки Android APK.

## Важное ограничение текущего этапа

Сейчас это **интерфейсный прототип с демонстрационными данными**. Настоящая авторизация, API, единая база данных, права ролей и реальные отчёты ещё не подключены. Не вводите реальные пароли, данные клиентов или финансовые записи и не используйте прототип как рабочую систему до подключения и тестирования backend.

## Запуск в Codespaces

```bash
npm install
npm run dev
```

## Публикация веб-версии

1. В GitHub откройте **Settings → Pages** и выберите **GitHub Actions** как источник публикации.
2. После добавления файлов workflow `Deploy MOI MARKET PRO PWA` автоматически соберёт и опубликует сайт.
3. URL будет иметь вид `https://moymarket235.github.io/moi-market-pro-system/`.

## Android APK

1. Откройте вкладку **Actions**.
2. Выберите **Build MOI MARKET PRO Android APK** → **Run workflow**.
3. После успешного завершения откройте run и внизу **Artifacts** жүктөп `moi-market-pro-debug-apk` архивин алыңыз. Ичинде `app-debug.apk` болот. Бул debug APK тест үчүн, Play Market'ке жарыялоого даяр release кол тамгасы эмес.

## iPhone

После публикации HTTPS откройте страницу в Safari → **Поделиться → На экран «Домой» → Добавить**. Так устанавливается веб-приложение (PWA), а не отдельный нативный IPA-файл.

## Структура

- `src/` — интерфейс и стили
- `public/` — manifest, service worker и значок приложения
- `scripts/generate-icons.mjs` — PNG-иконки для PWA
- `.github/workflows/deploy-pages.yml` — публикация веб-версии
- `.github/workflows/build-android.yml` — тестовая сборка APK
