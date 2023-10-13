import React, { useEffect, useState } from 'react';
import classes from './Trainer.module.scss';
import { Box, Button, CircularProgress } from '@mui/material';
import SvgSelector from 'src/components/SvgSelector/SvgSelector';
import clsx from 'clsx';
import { useAppSelector, useBoundActions } from 'src/app/hooks';
import {
  fetchCompoQuestionsAsync,
  fetchNewQuestionsAsync,
  fetchRepeatQuestionsAsync,
  reportQuestionAsync,
  trainerActions,
} from './Trainer.slice';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import CustomButton from 'src/components/CustomButton/CustomButton';

const allActions = {
  ...trainerActions,
  fetchNewQuestionsAsync,
  fetchRepeatQuestionsAsync,
  fetchCompoQuestionsAsync,
  reportQuestionAsync,
};

type TTrainerProps = {};

const Trainer: React.FC<TTrainerProps> = ({}) => {
  const categoriesIds = useAppSelector(
    (state) => state.trainerReducer.categoriesIds
  );
  const questions = useAppSelector((state) => state.trainerReducer.questions);
  const boundActions = useBoundActions(allActions);
  const [isAnswerHidden, setAnswerHidden] = useState(true);
  const [fetching, setFetching] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const isParamsValid = ['new', 'repeat', 'compo'].includes(params.type || '');

  const fetchQuestions = () => {
    switch (params.type) {
      case 'new':
        return boundActions.fetchNewQuestionsAsync({ categoriesIds }).unwrap();
      case 'repeat':
        return boundActions
          .fetchRepeatQuestionsAsync({ categoriesIds })
          .unwrap();
      case 'compo':
        return boundActions
          .fetchCompoQuestionsAsync({ categoriesIds })
          .unwrap();
      default:
        break;
    }
  };

  const handleReport = async (id: number, correct: boolean) => {
    boundActions.reportQuestionAsync({ id, correct });
    setAnswerHidden(true);
    if (questions.length === 1) handleExit();
  };

  const handleExit = () => {
    navigate('/');
  };

  useEffect(() => {
    if (!isParamsValid) return;
    fetchQuestions()
      ?.then(() => setFetching(false))
      .catch(() => setFetching(false));
  }, []);

  if (!isParamsValid) return <Navigate replace to="/404" />;
  if (!fetching && !questions.length) {
    return <Navigate to="/" />;
  }

  const question = questions[0];
  if (!question)
    return (
      <Box p={10} display="flex" justifyContent='center'>
        <CircularProgress />
      </Box>
    );

  return (
    <div className={classes.wrapper}>
      <h1>{question.category?.name}</h1>
      <span className={classes.counter}>
        {question.successes_in_row !== undefined
          ? `Вы отвечали на этот вопрос ${questions[0]?.successes_in_row} раз(а) подряд без ошибок`
          : 'Новый вопрос'}
      </span>
      <div dangerouslySetInnerHTML={{ __html: question.title }} />
      <div className={classes.answer}>
        <div dangerouslySetInnerHTML={{ __html: question.answer }} />
        <div
          className={clsx(classes['button-wrapper'], {
            [classes.active]: isAnswerHidden,
          })}
        >
          <div />
          <div className={classes.buttonDiv}>
            <div />
            <Button
              variant={'contained'}
              onClick={() => setAnswerHidden(false)}
            >
              <SvgSelector id="eye" className={classes.show} />
              <p>Нажмите, чтобы увидеть ответ</p>
            </Button>
            <div />
          </div>
          <div />
        </div>
      </div>
      <div className={classes.buttons}>
        <CustomButton
          variant="outlined"
          className={classes.outlined}
          onClick={() => handleReport(question.id, true)}
        >
          <SvgSelector id="check" />
        </CustomButton>
        <CustomButton
          variant="contained"
          className={classes.contained}
          onClick={() => handleReport(question.id, false)}
        >
          <SvgSelector id={questions?.length <= 1 ? 'exit' : 'next'} />
        </CustomButton>
      </div>
    </div>
  );
};

export default Trainer;
