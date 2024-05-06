import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, startWith } from 'rxjs';
import { SearchState } from '../../store/search/search.state';
import * as SearchActions from '../../store/search/search.actions';
import * as SearchSelectors from '../../store/search/search.selectors';
import { Issue } from '../../interfaces/issue';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl('');
  filteredOptions$: Observable<string[]>;
  filteredIssues$: Observable<Issue[]>;
 

  allOptions = [
    'Project: Cool-Project',
    'Project: Beans-PROJECT',
    'Project: Memes-Project',
    'Project: Details-Project',
    'Project: Health-Project',
    'Project: Wealth-Project',
    'Title: Blurry fonts',
    'Title: Redesign icons',
    'Title: Button colours not correct',
    'Title: Values not right',
    'Assignee: David Toss',
    'Assignee: Andrea Tait',
    'Assignee: John DeLacey',
    'Assignee: Ross Taylor',
    'Assignee: Vijay Gupta',
    'Assignee: Andrew Foster',
    'Status: Resolved',
    'Status: Open',
    'Status: Closed',
    'Status: Test',
    'Status: Live',
    'Status: Open',
  ];


  constructor(private store: Store<SearchState>) {
    this.filteredIssues$ = this.store.select(SearchSelectors.selectFilteredIssues);
    this.filteredOptions$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterOptions(value as string))
    );
  }

  ngOnInit(): void {
    this.store.dispatch(SearchActions.loadIssues());
  }

  private filterOptions(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  onOptionSelected(event: any): void {
    const selectedOption = event.option.value;
    const [criteria, value] = selectedOption.split(': ');

    this.store.dispatch(SearchActions.filterIssues({ filter: value, criteria: criteria.toLowerCase() }));
  }
}
