import { TRoute } from 'src/router/Router.types';
import Main from 'src/features/main/Main';
import Trainer from 'src/features/trainer/Trainer';
import Questions from 'src/features/questions/Questions';
import EditQuestion from 'src/features/questions/EditQuestion';
import AddQuestion from 'src/features/questions/AddQuestion';
import Categories from 'src/features/categories/Categories';
import Login from 'src/features/auth/Login';
import Registration from 'src/features/auth/Registration';
import React from "react";
import Settings from "src/features/settings/Settings";

export const privateRoutes: TRoute[] = [
  {
    path: '/',
    label: '',
    element: <Main />,
  },
  { path: '/trainer/:type', label: 'Тренажер', element: <Trainer /> },
  { path: '/settings', label: 'Настройки', element: <Settings /> },
];

export const adminRoutes: TRoute[] = [
  { path: '/admin', label: 'Панель администратора', element: <></> },
  {
    path: '/admin/questions',
    label: 'Вопросы',
    element: <Questions />,
  },
  {
    path: '/admin/questions/edit/:id',
    label: 'Редактировать',
    element: <EditQuestion />,
  },
  {
    path: '/admin/questions/add',
    label: 'Создать',
    element: <AddQuestion />,
  },
  {
    path: '/admin/categories',
    label: 'Темы вопросов',
    element: <Categories />,
  },
];

export const publicRoutes: TRoute[] = [
  {
    path: '/auth/login',
    label: '',
    element: <Login />,
  },
  {
    path: '/auth/registration',
    label: '',
    element: <Registration />,
  },
];
