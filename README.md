### Hexlet and Github Actions:
[![Action Status](https://github.com/SergeevaEA/frontend-project-11/actions/workflows/build.yml/badge.svg)](https://github.com/SergeevaEA/frontend-project-11/actions/workflows/build.yml)
[![Hexlet-check](https://github.com/SergeevaEA/frontend-project-11/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/SergeevaEA/frontend-project-11/actions/workflows/hexlet-check.yml)

### Качество кода:
[![Maintainability](https://sonarcloud.io/api/project_badges/measure?project=SergeevaEA_frontend-project-11&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=SergeevaEA_frontend-project-11)

# RSS-агрегатор

Сервис для агрегации RSS-потоков на чистом JS с применением шаблона проектирования MVC.

## Технологический стек

JavaScript, DOM API, axios, Vite, Webpack, ESLint, Bootstrap, yup, on-change, lodash, i18next, Vercel

## Выполненные задачи

* создала страницу с формой для добавления RSS-потока
* реализовала валидацию введенного адреса с помощью yup
* реализовала вывод всех текстов интерфейса через библиотеку i18next
* реализовала скачивание потока, парсинг данных потока и добавление нужных данных в соответствующие списки, обработку ошибок
* реализовала код, который раз в 5 секунд проверяет каждый RSS-поток, и если он содержит новые посты, добавляет их в список
* реализовала возможность предпросмотра каждого поста по клику на кнопку рядом с названием поста (в модальном окне появляются заголовок и описание поста)

## Демонстрация работы проекта

```bash
https://frontend-project-11-5ll9.vercel.app/
```

Страница c формой для добавления RSS-потока:

![Страница с формой для добавления RSS-потока](src/assets/images/MainPage.png)

Отображение данных потока:

![Отображение данных потока](src/assets/images/DownloadSuccess.png)

Предпросмотр поста по клику на кнопку рядом с названием поста:

![Предпросмотр поста](src/assets/images/ModalWindow.png)

## Установка

Клонировать репозиторий:

```bash
git clone https://github.com/SergeevaEA/frontend-project-11.git
cd frontend-project-11
```

Установить зависимости:

```bash
make install
```

Запустить dev-сервер:

```bash
make dev
```
