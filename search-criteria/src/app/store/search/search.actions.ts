import { createAction, props } from '@ngrx/store';
import { Issue } from '../../interfaces/issue';

export const loadIssues = createAction(
  '[Search] Load Issues'
);

export const loadIssuesSuccess = createAction(
  '[Search] Load Issues Success',
  props<{ issues: Issue[] }>()
);

export const filterIssues = createAction(
  '[Search] Filter Issues',
  props<{ filter: string, criteria: string }>()
);
