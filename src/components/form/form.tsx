import { useState } from 'react';
import { Button, Input, TextField, Grid } from '@mui/material';
import { addQuestion } from '../../store/postSlice';
import { useDispatch } from 'react-redux';
import './form.css';

const Form = () => {
  const dispatch = useDispatch();
  const [postValues, setPostValues] = useState({
    name: '',
    email: '',
    carModel: '',
    carBrand: '',
    title: '',
  });
  const [errorInfo, setErrorInfo] = useState({
    errorName: false,
    errorEmail: false,
    errorCarModel: false,
    errorCarBrand: false,
    errorTitle: false,
  });
  return (
    <div className='formWrapper'>
      <Grid container spacing={2}>
        <Grid item xs={12} className='title'>
          Задать вопрос
        </Grid>
        <Grid item xs={6}>
          {errorInfo.errorName && (
            <div style={{ color: 'red' }}>Только русские буквы и не более 30 символов</div>
          )}
          <Input
            required
            placeholder='Имя'
            fullWidth
            value={postValues.name}
            onChange={(e) => {
              setPostValues({
                ...postValues,
                name: e.target.value,
              });
              setErrorInfo({
                ...errorInfo,
                errorName: false,
              });
            }}
            onBlur={(e) => {
              let res = /^[а-яА-Я]+$/;
              if ((e.target.value.length < 2 || e.target.value.length > 30) || !res.test(String(e.target.value).toLowerCase())) {
                setErrorInfo({
                  ...errorInfo,
                  errorName: true,
                });
              } else {
                setErrorInfo({
                  ...errorInfo,
                  errorName: false,
                });
              }
            }}
          />
        </Grid>
        <Grid item xs={6}>
          {errorInfo.errorEmail && (
            <div style={{ color: 'red' }}>Некорректный email</div>
          )}
          <Input
            required
            placeholder='Email'
            fullWidth
            value={postValues.email}
            onChange={(e) => {
              setPostValues({
                ...postValues,
                email: e.target.value,
              });
              setErrorInfo({
                ...errorInfo,
                errorEmail: false,
              });
            }}
            onBlur={(e) => {
              let res =
                /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
              if (!res.test(String(e.target.value).toLowerCase())) {
                setErrorInfo({
                  ...errorInfo,
                  errorEmail: true,
                });
              } else {
                setErrorInfo({
                  ...errorInfo,
                  errorEmail: false,
                });
              }
            }}
          />
        </Grid>
        <Grid item xs={6}>
          {errorInfo.errorCarBrand && (
            <div style={{ color: 'red' }}>Только латиница и не более 20 символов</div>
          )}
          <Input
            required
            placeholder='Марка авто'
            fullWidth
            value={postValues.carBrand}
            onChange={(e) => {
              setPostValues({
                ...postValues,
                carBrand: e.target.value,
              });
              setErrorInfo({
                ...errorInfo,
                errorCarBrand: false,
              });
            }}
            onBlur={(e) => {
              let res = /^[a-zA-Z]+$/;
              if ((e.target.value.length < 4 || e.target.value.length > 20) || !res.test(String(e.target.value).toLowerCase())) {
                setErrorInfo({
                  ...errorInfo,
                  errorCarBrand: true,
                });
              } else {
                setErrorInfo({
                  ...errorInfo,
                  errorCarBrand: false,
                });
              }
            }}
          />
        </Grid>
        <Grid item xs={6}>
          {errorInfo.errorCarModel && (
            <div style={{ color: 'red' }}>Только латиница и не более 20 символов</div>
          )}
          <Input
            required
            placeholder='Модель авто'
            fullWidth
            value={postValues.carModel}
            onChange={(e) => {
              setPostValues({
                ...postValues,
                carModel: e.target.value,
              });
              setErrorInfo({
                ...errorInfo,
                errorCarModel: false,
              });
            }}
            onBlur={(e) => {
              let res = /^[a-zA-Z0-9]+$/;
              if ((e.target.value.length < 4 || e.target.value.length > 20) || !res.test(String(e.target.value).toLowerCase())) {
                setErrorInfo({
                  ...errorInfo,
                  errorCarModel: true,
                });
              } else {
                setErrorInfo({
                  ...errorInfo,
                  errorCarModel: false,
                });
              }
            }}
          />
        </Grid>
        <Grid item xs={12}>
          {errorInfo.errorTitle && (
            <div style={{ color: 'red' }}>Не более 500 символов</div>
          )}
          <TextField
            required
            multiline
            rows={3}
            placeholder='Введите текст вопроса'
            fullWidth
            value={postValues.title}
            onChange={(e) => {
              setPostValues({
                ...postValues,
                title: e.target.value,
              });
              setErrorInfo({
                ...errorInfo,
                errorTitle: false,
              });
            }}
            onBlur={(e) => {
              if (e.target.value.length === 0 || e.target.value.length > 500) {
                setErrorInfo({
                  ...errorInfo,
                  errorTitle: true,
                });
              } else {
                setErrorInfo({
                  ...errorInfo,
                  errorTitle: false,
                });
              }
            }}
          />
        </Grid>
        <Grid item>
          <Button
            onClick={() => {
              dispatch(
                addQuestion({
                  ...postValues,
                  created: new Date(),
                })
              );
              setPostValues({
                name: '',
                email: '',
                carModel: '',
                carBrand: '',
                title: '',
              });
            }}
            variant='contained'
            color='success'
            disabled={
              postValues.name === '' ||
              postValues.carBrand === '' ||
              postValues.carModel === '' ||
              postValues.email === '' ||
              postValues.title === ''
            }
          >
            Отправить
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Form;
