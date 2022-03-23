import { useSelector } from 'react-redux';

import { Grid } from '@mui/material';
import { format } from 'date-fns';
import Form from './components/form/form';

function App() {
  const data = useSelector((state) => state.posts);
  return (
    <div className='postWrapper'>
      <Grid container spacing={2}>
        {data.posts.length !== 0 && (
          <Grid item xs={12} className='title'>
            Вопросы по автомобилям
          </Grid>
        )}
        {data.posts.length !== 0
          ? data.posts.map((post, index) => (
              <>
                <Grid item xs={1} key={Math.floor(Math.random() * 100)}>
                  <span className='nameTitle'>{post.json.name}</span>
                </Grid>
                <Grid item xs={2} key={Math.floor(Math.random() * 100)}>
                  {post.json.carBrand}{' '}
                  <span className='modelTitle'>{post.json.carModel}</span>
                </Grid>
                <Grid item xs={12} key={Math.floor(Math.random() * 100)}>
                  <span className='timeTitle'>
                    {format(new Date(post.json.created), 'dd.MM.yyyy')} в{' '}
                    {format(new Date(post.json.created), 'HH.mm')}
                  </span>
                </Grid>
                <Grid item xs={12} key={Math.floor(Math.random() * 100)}>
                  {post.json.title}
                </Grid>
              </>
            ))
          : null}
      </Grid>
      <Form />
    </div>
  );
}

export default App;
