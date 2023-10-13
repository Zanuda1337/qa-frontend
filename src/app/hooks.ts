import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { AppDispatch, BoundActions, RootState } from 'src/app/types';
import bindActionCreators from "react-redux/es/utils/bindActionCreators";
import { ActionCreatorsMapObject } from '@reduxjs/toolkit';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useBoundActions = <Actions extends ActionCreatorsMapObject>(
  actions: Actions
): BoundActions<Actions> => {
  const dispatch = useAppDispatch();

  // @ts-ignore
  return useMemo(() => bindActionCreators(actions, dispatch), []);
};
