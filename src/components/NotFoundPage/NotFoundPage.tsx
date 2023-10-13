import React from 'react';
import classes from './NotFoundPage.module.scss';
import Vincent from 'src/assets/images/vincent.png';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import clsx from "clsx";

type TNotFoundPageProps = {};

const NotFoundPage: React.FC<TNotFoundPageProps> = ({}) => {
  const navigate = useNavigate();
  return (
    <div className={classes.wrapper}>
      <div className={clsx(classes.block, classes.image)}>
        <img src={Vincent} alt="" />
      </div>
      <div className={classes.block}>
	      <h1>4<span>0</span>4</h1>
        <h2>
          Упс,
          <br /> здесь <span>ничего</span> нет...
        </h2>
        <p>Ох, кажется страницы, что вы ищете, не существует.</p>
        <Button
          onClick={() => navigate('/')}
          className={classes.button}
          variant="contained"
        >
          <p className={classes['button-text']}>На главную</p>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
