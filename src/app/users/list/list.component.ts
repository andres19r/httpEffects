import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { loadUsers } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';
import { selectAllUsers } from 'src/app/store/selectors/users.selectors';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, OnDestroy {
  users$: Observable<User[]> = of([]);
  loading: boolean = false;
  error: any;
  private _unsubscribe$ = new Subject<void>();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.users$ = this.store.select(selectAllUsers);
    this.store
      .select('users')
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(({ users, loading, error }) => {
        this.loading = loading;
        this.error = error;
      });
    this.store.dispatch(loadUsers());
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
