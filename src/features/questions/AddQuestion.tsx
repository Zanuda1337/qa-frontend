import React from 'react';import QuestionForm from 'src/features/questions/QuestionForm';import { useNavigate } from 'react-router-dom';import { useAppSelector, useBoundActions } from 'src/app/hooks';import { createQuestionAsync } from 'src/features/questions/Questions.slice';import { useSnackbarListener } from 'src/hooks';type TAddQuestionProps = {};const AddQuestion: React.FC<TAddQuestionProps> = ({}) => {  const navigate = useNavigate();  const boundActions = useBoundActions({ createQuestionAsync });  const creating = useAppSelector(    (state) => state.questionsReducer.meta.creating  );  const status = useAppSelector((state) => state.questionsReducer.status);  const message = useAppSelector((state) => state.questionsReducer.message);  const handleSubmit = (data: {    categoryId: string;    title: string;    answer: string;  }) => {    boundActions      .createQuestionAsync({        ...data,        categoryId: +data.categoryId,      }).unwrap()      .then(() => navigate('/admin/questions')).catch(() => {});  };  useSnackbarListener(message, status === 'failed' ? 'error' : 'info');  return (    <div className={'form'}>      <QuestionForm fetching={creating} onSubmit={handleSubmit} />    </div>  );};export default AddQuestion;