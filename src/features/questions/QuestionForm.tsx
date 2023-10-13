import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomEditor from 'src/components/CustomEditor/CustomEditor';
import CustomSelect from 'src/components/CustomSelect/CustomSelect';
import { clsx } from 'clsx';
import { Controller, useForm } from 'react-hook-form';
import { required } from 'src/utils/validators';
import { useAppSelector, useBoundActions } from 'src/app/hooks';
import { fetchCategoriesAsync } from 'src/features/categories/Categories.slice';
import CustomButton from "src/components/CustomButton/CustomButton";

type TFormFields = {
  categoryId: string;
  title: string;
  answer: string;
};

type TFormProps = {
  values?: TFormFields;
  fetching: boolean;
  onSubmit: (data: TFormFields) => void;
};

const QuestionForm: React.FC<TFormProps> = ({
  values = { categoryId: '', title: '', answer: '' },
  fetching,
  onSubmit,
}) => {
  const categories = useAppSelector(
    (state) => state.categoriesReducer.categories
  );
  const boundActions = useBoundActions({ fetchCategoriesAsync });
  const { handleSubmit, control } = useForm<TFormFields>({
    values: values,
    mode: 'onBlur',
  });
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    boundActions.fetchCategoriesAsync({ withQuestions: false });
  }, []);

  const options = categories.map((category) => ({
    value: category.id.toString(),
    label: category.name,
  }));

  return (
    <form>
      <div className={clsx('preloader-container', { active: !initialized })}>
        <CircularProgress />
      </div>
      <Controller
        name="categoryId"
        control={control}
        rules={{
          required,
        }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <CustomSelect
            label="Тема вопроса"
            error={!!error}
            message={error?.message}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            options={options}
          />
        )}
      />

      <Controller
        name="title"
        control={control}
        rules={{
          required,
        }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <CustomEditor
            label={'Вопрос'}
            value={value}
            forceH2
            message={error?.message}
            error={!!error}
            onInit={() => setInitialized(true)}
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
      />
      <Controller
        name="answer"
        control={control}
        rules={{
          required,
        }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <CustomEditor
            label={'Ответ'}
            value={value}
            message={error?.message}
            error={!!error}
            onInit={() => setInitialized(true)}
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
      />
      <CustomButton fetching={fetching} variant="contained" onClick={handleSubmit(onSubmit)}>
        <p>Подтвердить</p>
      </CustomButton>
    </form>
  );
};

export default QuestionForm;
