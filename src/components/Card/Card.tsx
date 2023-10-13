import { Button } from '@mui/material';
import React from 'react';
import classes from './Card.module.scss';
import CircularProgress from 'src/components/CircularProgress/CircularProgress';

type TCardProps = {
  title: string;
  progress?: number;
  total?: number;
  color: string;
  image: string;
  disabled: boolean;
  hideSubtext?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Card: React.FC<TCardProps> = ({
  progress = 0,
  title,
  total,
  color,
  image,
  disabled,
  hideSubtext,
  onClick,
}) => {
  return (
    <Button
      variant={'contained'}
      style={{ background: color, opacity: disabled ? 0.35 : 1 }}
      className={classes.card}
      onClick={onClick}
      disabled={disabled}
    >
      <div
        className={classes['img-container']}

      >
        {total !== 0 && total !== undefined && (
          <CircularProgress
            progress={(100 / total) * progress}
            stroke={'#f3e37e'}
            size={90}
            strokeWidth={1.25}
            offset={0}
          />
        )}
        <img src={image} alt="cardImage" />
      </div>
      <p className={classes.title}>{title}</p>
      { total !== 0 && total !== undefined ? (
        <p>
          {disabled
            ? 'Завершено'
            : `Осталось ${total - progress}${
                progress ? ` из ${total} вопросов` : ' вопросов'
              }`}
        </p>
      ) : (
        !hideSubtext && <p>Темы не выбраны</p>
      )}
    </Button>
  );
};

export default Card;
