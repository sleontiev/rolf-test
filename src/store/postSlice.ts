import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface IPost {
  name: string;
  email: string;
  carModel: string;
  carBrand: string;
  title: string;
  created: Date;
}

export interface IInitialState {
  posts: any[],
}

export const addQuestion = createAsyncThunk(
  'post/addPost',
  async function (
    { name, email, carModel, carBrand, title, created }: IPost,
    { rejectWithValue, dispatch }
  ) {
    try {
      const post = {
        name,
        email,
        carBrand,
        carModel,
        title,
        created,
      };

      const response = await fetch(`http://httpbin.org/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        throw new Error('Ошибка при добавлении вопроса');
      }

      const data = await response.json();
      dispatch(addPost(data));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
  } as IInitialState,
  reducers: {
    addPost(state, action: PayloadAction<any[]>) {
      state.posts.push(action.payload);
    },
  },
});

const { addPost } = postSlice.actions;

export default postSlice.reducer;
