import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSprintGrid from './reducer';
import { datesAdapter, sprintGridAdapter } from './reducer';

export const selectSprintGridState = createFeatureSelector<fromSprintGrid.SprintGridState>(
	fromSprintGrid.sprintGridFeatureKey,
);

export const {
	selectAll: selectTasks,
	selectEntities: selectTaskEntities,
} = sprintGridAdapter.getSelectors(selectSprintGridState);
export const selectDatesState = createSelector(selectSprintGridState, (state) => state.dates);
export const {
	selectAll: selectDates,
	selectEntities: selectDateEntities,
} = datesAdapter.getSelectors(selectDatesState);
