import { createReducer, on, Action } from '@ngrx/store';
import * as SearchActions from './search.actions';
import { SearchState } from './search.state';
import { Issue } from '../../interfaces/issue';

const initialState: SearchState = {
  issues: [],
  filteredIssues: []
};

const searchReducer = createReducer(
  initialState,
  on(SearchActions.loadIssuesSuccess, (state, { issues }) => ({ ...state, issues, filteredIssues: issues })),
  on(SearchActions.filterIssues, (state, { filter, criteria }) => {
    const filteredIssues = state.issues.filter(issue =>
      issue[criteria as keyof Issue].toLowerCase().includes(filter.toLowerCase())
    );
    return { ...state, filteredIssues };
  })
);

export function reducer(state: SearchState | undefined, action: Action) {
  return searchReducer(state, action);
}

