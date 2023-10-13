import React, { useEffect } from 'react';
import 'src/assets/styles/reset.css';
import 'src/assets/styles/global.scss';
import Router from 'src/router/Router';
import { initialize } from 'src/App.slice';
import {useAppSelector, useBoundActions} from 'src/app/hooks';

const App: React.FC = () => {
  const initialized = useAppSelector((state) => state.appReducer.initialized);
  const boundActions = useBoundActions({initialize})
  useEffect(() => {
    boundActions.initialize();
  }, []);
  if (!initialized)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '10rem',
	        height: '100vh'
        }}
      >
        LOADING...
      </div>
    );
  return <Router />;
};

export default App;
