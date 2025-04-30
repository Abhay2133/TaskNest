// tasksSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/lib/axios';

// adding new task

export const addNewTask = createAsyncThunk(
  'task/addNewTask',
  async (taskData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      // console.log("token ",token)
      const res = await axios.post('/task/add', taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("just a checkpoint: ")
      return res.data.task;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);

// deleting task
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      await axios.delete(`/task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return taskId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Delete failed');
    }
  }
);

export const toggleComplete = createAsyncThunk(
  'tasks/toggleComplete',
  async ({ id, completed }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`/task/${id}`, { completed });
      return res.data.task;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Toggle failed');
    }
  }
);

// update aur edit task

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`/task/${id}`, updates);
      return res.data.task;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Update failed');
    }
  }
);


// 🛑 Fetch Tasks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const res = await axios.get('/task/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("Tasks from backend:", res.data.tasks)
      return res.data.tasks;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const toggleImportant = createAsyncThunk(
  'tasks/toggleImportant',
  async ({ id, important }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`/task/${id}`, { important });
      return res.data.task;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to toggle important');
    }
  }
);


const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addNewTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload); // Add new task to store
      })
      .addCase(addNewTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
      })
      .addCase(toggleComplete.fulfilled, (state, action) => {
        const updated = action.payload;
        state.tasks = state.tasks.map(task =>
          task._id === updated._id ? updated : task
        );
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updated = action.payload;
        state.tasks = state.tasks.map(task =>
          task._id === updated._id ? updated : task
        );
      })    
      .addCase(toggleImportant.fulfilled, (state, action) => {
        const updated = action.payload;
        state.tasks = state.tasks.map(task =>
          task._id === updated._id ? updated : task
        );
      });
  },
});

export default taskSlice.reducer;
