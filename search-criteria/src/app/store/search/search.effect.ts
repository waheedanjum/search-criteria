import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as SearchActions from './search.actions';
import { Issue } from '../../interfaces/issue';
import { TypedAction } from '@ngrx/store/src/models';

@Injectable()
export class SearchEffects {
  constructor(private actions$: Actions) {}

  loadIssues$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.loadIssues),
      mergeMap(() =>
        of(this.getIssues()).pipe(
          map(issues => SearchActions.loadIssuesSuccess({ issues })),
          catchError(() => of(SearchActions.loadIssuesSuccess({ issues: [] })))
        )
      )
    )
  );

  private getIssues(): Issue[] {
    return [
      { id: '1', title: 'Blurry fonts', project: 'Cool-Project', assignee: 'David Toss', status: 'Resolved' },
      { id: '2', title: 'Redesign icons', project: 'Beans-PROJECT', assignee: 'Andrea Tait', status: 'Open' },
      { id: '3', title: 'Fix Paragraph', project: 'Memes-Project', assignee: 'John DeLacey', status: 'Closed' },
      { id: '4', title: 'Button colours not correct', project: 'Details-Project', assignee: 'Ross Taylor ', status: 'Test' },
      { id: '5', title: 'Values not right', project: 'Health-PROJECT', assignee: 'Vijay Gupta', status: 'Live' },
      { id: '6', title: 'Fix the field length', project: 'Wealth-Project', assignee: 'Andrew Foster', status: 'Open' }
    ];
  }
}
