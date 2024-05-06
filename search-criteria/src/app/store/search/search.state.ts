import { Issue } from '../../interfaces/issue';

export interface SearchState {
  issues: Issue[];
  filteredIssues: Issue[];
}
