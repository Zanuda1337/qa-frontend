import React, {useEffect, useState} from 'react';
import 'src/assets/styles/reset.css';
import 'src/assets/styles/global.scss';
import Router from 'src/router/Router';
import { initialize } from 'src/App.slice';
import {useAppSelector, useBoundActions} from 'src/app/hooks';
import Preloader from "src/components/Preloader/Preloader";

const App: React.FC = () => {
  const initialized = useAppSelector((state) => state.appReducer.initialized);
  const boundActions = useBoundActions({initialize})
  const [initializedFlag, setInitializedFlag] = useState(false);

  useEffect(() => {
    if(!initialized) return;
    setTimeout(() => setInitializedFlag(true), 500);
  }, [initialized])

  useEffect(() => {
    boundActions.initialize();
  }, []);

  return <>
    {!initializedFlag && <Preloader visible={!initialized}/>}
    {initialized && <Router/>}
    </>;
};

export default App;
