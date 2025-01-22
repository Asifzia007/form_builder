import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchFormBuilder = createAsyncThunk('formBuilder/fetchFormBuilder', async () => {
  const response = await fetch('http://localhost:3001/forms');
  if (!response.ok) {
    throw new Error('Failed to fetch forms');
  }
  return response.json();
});


export const saveFormBuilder = createAsyncThunk('formBuilder/saveFormBuilder', async (formData) => {
  const response = await fetch('http://localhost:3001/forms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error('Failed to save form');
  }
  return response.json();
});

const formBuilderSlice = createSlice({
  name: 'formBuilder',
  initialState: {
    forms: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFormBuilder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFormBuilder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.forms = action.payload;
      })
      .addCase(fetchFormBuilder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(saveFormBuilder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveFormBuilder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.forms.push(action.payload);
      })
      .addCase(saveFormBuilder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default formBuilderSlice.reducer;