import { createSelector } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { UserState } from '../reducers';

export const selectUser = (state: AppState) => state.user;

export const selectUserById = createSelector(
  selectUser,
  (state: UserState) => state.user
);

export const selectUserError = createSelector(
  selectUser,
  (state: UserState) => state.error
);

export const selectUserLoading = createSelector(
  selectUser,
  (state: UserState) => state.loading
);
