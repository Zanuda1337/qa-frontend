import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from 'src/App.slice';
import { authReducer } from 'src/features/auth/Auth.slice';
import { categoriesReducer } from 'src/features/categories/Categories.slice';
import { questionsReducer } from 'src/features/questions/Questions.slice';
import { trainerReducer } from 'src/features/trainer/Trainer.slice';

export const store = configureStore({
  reducer: {
    authReducer,
    appReducer,
    questionsReducer,
    categoriesReducer,
    trainerReducer
  },
});
