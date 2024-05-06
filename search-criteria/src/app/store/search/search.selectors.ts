import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SearchState } from './search.state';

export const selectSearchState = createFeatureSelector<SearchState>('search');

export const selectFilteredIssues = createSelector(
  selectSearchState,
  (state) => state.filteredIssues
);