import { createSelector } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { UsersState } from '../reducers';

export const selectUsers = (state: AppState) => state.users;

export const selectAllUsers = createSelector(
  selectUsers,
  (state: UsersState) => state.users
);

export const selectUsersError = createSelector(
  selectUsers,
  (state: UsersState) => state.error
);
export const selectUsersLoading = createSelector(
  selectUsers,
  (state: UsersState) => state.loading
);
