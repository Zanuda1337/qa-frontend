import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  ILoginRequest,
  IRegistrationRequest,
  TChangePasswordRequest,
  TUser,
} from 'src/features/auth/Auth.types';
import { authApi } from 'src/api/authApi/authApi';
import { STORAGE_TOKEN_KEY } from 'src/features/auth/Auth.consts';
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from 'src/utils';
import { TStateBase } from 'src/types';
import { trainerApi } from 'src/api/trainerApi/trainerApi';

interface AuthState extends TStateBase {
  user: null | TUser;
  isLoggedIn: boolean;
  meta: {
    deleting: boolean;
    updating: boolean;
    reset: boolean;
  };
}

const initialState: AuthState = {
  status: 'idle',
  message: '',
  user: null,
  isLoggedIn: false,
  meta: {
    deleting: false,
    reset: false,
    updating: false,
  },
};

const authSlice = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem(STORAGE_TOKEN_KEY);
    },
  },

  extraReducers: (builder) => {
    // CHANGE PASS
    builder.addCase(changePasswordAsync.pending, (state) => {
      state.meta.updating = true
    });
    builder.addCase(changePasswordAsync.rejected, (state, { payload }) => {
      state.message = payload;
      state.meta.updating = false;
    });
    builder.addCase(changePasswordAsync.fulfilled, (state) => {
      state.meta.updating = false;
      state.message = 'Пароль изменен'
    });

    // RESET PROGRESS
    builder.addCase(resetProgressAsync.pending, (state) => {
      state.meta.reset = true;
    });
    builder.addCase(resetProgressAsync.rejected, (state, { payload }) => {
      state.message = payload;
      state.meta.reset = false;
    });
    builder.addCase(resetProgressAsync.fulfilled, (state) => {
      state.meta.reset = false;
      state.message = 'Прогресс обнулен'
    });

    // DELETE
    builder.addCase(deleteAccountAsync.pending, (state) => {
      state.meta.deleting = true;
    });
    builder.addCase(deleteAccountAsync.rejected, (state, { payload }) => {
      state.message = payload;
      state.meta.deleting = false;
    });
    builder.addCase(deleteAccountAsync.fulfilled, (state) => {
      state.meta.deleting = false;
    });

    // FETCH
    builder.addCase(fetchMeAsync.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isLoggedIn = true;
    });

    // LOGIN
    builder.addCase(fetchLoginAsync.rejected, (state, { payload }) => {
      state.message = payload;
    });
    builder.addCase(fetchLoginAsync.fulfilled, (state, { payload }) => {
      localStorage.setItem(STORAGE_TOKEN_KEY, payload.token);
      state.isLoggedIn = true;
    });

    // REGISTRATION
    builder.addCase(fetchRegistrationAsync.rejected, (state, { payload }) => {
      state.message = payload;
    });
    builder.addCase(fetchRegistrationAsync.fulfilled, (state, { payload }) => {
      localStorage.setItem(STORAGE_TOKEN_KEY, payload.token);
      state.isLoggedIn = true;
    });

    // OTHER
    builder.addMatcher(isPendingAction, (state) => {
      state.status = 'loading';
      state.message = '';
    });
    builder.addMatcher(isRejectedAction, (state) => {
      state.status = 'failed';
    });
    builder.addMatcher(isFulfilledAction, (state) => {
      state.status = 'idle';
    });
  },
});

export const fetchLoginAsync = createAsyncThunk(
  'authReducer/fetchLoginAsync',
  async (values: ILoginRequest, { rejectWithValue }) => {
    try {
      const { data } = await authApi.fetchLogin(values);
      return data;
    } catch (e: any) {
      const msg = JSON.parse(e.request?.response)?.message;
      return rejectWithValue(msg || e.message);
    }
  }
);
export const fetchMeAsync = createAsyncThunk(
  'authReducer/fetchMeAsync',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await authApi.fetchMe();
      return data;
    } catch (e: any) {
      const msg = JSON.parse(e.request?.response)?.message;
      return rejectWithValue(msg || e.message);
    }
  }
);

export const fetchRegistrationAsync = createAsyncThunk(
  'authReducer/fetchRegistrationAsync',
  async (values: IRegistrationRequest, { rejectWithValue }) => {
    try {
      const { data } = await authApi.registration(values);
      return data;
    } catch (e: any) {
      const msg = JSON.parse(e.request?.response)?.message;
      return rejectWithValue(msg || e.message);
    }
  }
);

export const changePasswordAsync = createAsyncThunk(
  'authReducer/changePasswordAsync',
  async (values: TChangePasswordRequest, { rejectWithValue }) => {
    try {
      await authApi.changePassword(values);
    } catch (e: any) {
      const msg = JSON.parse(e.request?.response)?.message;
      return rejectWithValue(msg || e.message);
    }
  }
);
export const resetProgressAsync = createAsyncThunk(
  'authReducer/resetProgressAsync',
  async (_, { rejectWithValue }) => {
    try {
      await trainerApi.resetProgress();
    } catch (e: any) {
      const msg = JSON.parse(e.request?.response)?.message;
      return rejectWithValue(msg || e.message);
    }
  }
);

export const deleteAccountAsync = createAsyncThunk(
  'authReducer/deleteAccountAsync',
  async (password: string, { rejectWithValue, dispatch }) => {
    try {
      await authApi.deleteAccount(password);
      dispatch(authActions.logout())
    } catch (e: any) {
      const msg = JSON.parse(e.request?.response)?.message;
      return rejectWithValue(msg || e.message);
    }
  }
);

export const {
  actions: { ...authActions },
  reducer: authReducer,
} = authSlice;
