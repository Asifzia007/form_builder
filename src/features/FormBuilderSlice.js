import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchFormBuilder = createAsyncThunk('formBuilder/fetchFormBuilder', async () => {
  const response = await fetch('http://localhost:3001/forms');
  if (!response.ok) {
    throw new Error('Failed to fetch forms');
  }
  return response.json();
});



export const fetchFormResponse = createAsyncThunk('formBuilder/fetchFormResponse', async () => {
  const response = await fetch('http://localhost:3001/responses');
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
    responses:[],
    fetchStatus: 'idle',  
    saveStatus: 'idle',   
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Form Builder Actions
      .addCase(fetchFormBuilder.pending, (state) => {
        state.fetchStatus = 'loading';
      })
      .addCase(fetchFormBuilder.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.forms = action.payload;
      })
      .addCase(fetchFormBuilder.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.error = action.error.message;
      })


      .addCase(fetchFormResponse.pending, (state) => {
        state.fetchStatus = 'loading';
      })
      .addCase(fetchFormResponse.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.responses = action.payload;
      })
      .addCase(fetchFormResponse.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.error = action.error.message;
      })
      
      
      // Save Form Builder Actions
      .addCase(saveFormBuilder.pending, (state) => {
        state.saveStatus = 'loading';
      })
      .addCase(saveFormBuilder.fulfilled, (state, action) => {
        state.saveStatus = 'succeeded';
        state.forms.push(action.payload);
      })
      .addCase(saveFormBuilder.rejected, (state, action) => {
        state.saveStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export default formBuilderSlice.reducer;