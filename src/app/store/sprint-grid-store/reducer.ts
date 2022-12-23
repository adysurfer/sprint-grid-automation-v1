import { SprintGridActions, SprintGridActionTypes } from './actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Task, Timestamp } from '@models';
import { mergeDates, removeDateFromTasks } from '@helpers';

export const sprintGridFeatureKey = 'sprintGrid';

export type EntityDates = EntityState<Timestamp>;

export const datesAdapter: EntityAdapter<Timestamp> = createEntityAdapter({
	selectId: (date: Timestamp) => date,
	sortComparer: false,
});

export const initialEntityDates: EntityDates = datesAdapter.getInitialState();

export interface SprintGridState extends EntityState<Task> {
	dates: EntityDates;
}

export const sprintGridAdapter: EntityAdapter<Task> = createEntityAdapter({
	selectId: (task: Task) => task.name,
	sortComparer: false,
});

export const initialSprintGridState: SprintGridState = sprintGridAdapter.getInitialState({
	dates: initialEntityDates,
});

export function reducer(
	state = initialSprintGridState,
	action: SprintGridActions,
): SprintGridState {
	switch (action.type) {
		case SprintGridActionTypes.LoadSprintGrid:
			return state;

		case SprintGridActionTypes.LoadSprintGridSuccess: {
			const tasks = action.payload.tasks;
			const dates = datesAdapter.setAll(mergeDates(tasks), state.dates);
			return sprintGridAdapter.setAll(tasks, { ...state, dates });
		}

		case SprintGridActionTypes.LoadSprintGridFailure:
			return state;

		case SprintGridActionTypes.UpdateOneTask:
			return sprintGridAdapter.upsertOne(action.payload.task, state);

		case SprintGridActionTypes.RemoveOneTask:
			return sprintGridAdapter.removeOne(action.payload.task.name, state);

		case SprintGridActionTypes.AddOneTask:
			return sprintGridAdapter.addOne(action.payload.task, state);

		case SprintGridActionTypes.AddOneDate: {
			const dates = datesAdapter.addOne(action.payload.date, state.dates);
			return { ...state, dates };
		}
		case SprintGridActionTypes.RemoveOneDate: {
			const removedDate = action.payload.date;
			const tasks = removeDateFromTasks(Object.values(state.entities), removedDate);
			const dates = datesAdapter.removeOne(removedDate, state.dates);
			return sprintGridAdapter.setAll(tasks, { ...state, dates });
		}

		default:
			return state;
	}
}
