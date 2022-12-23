import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, Timestamp } from '@models';
import { SprintGridState } from './reducer';
import { select, Store } from '@ngrx/store';
import { selectDateEntities, selectDates, selectTaskEntities, selectTasks } from './selectors';
import {
	AddOneDate,
	AddOneTask,
	LoadSprintGrid,
	RemoveOneDate,
	RemoveOneTask,
	UpdateOneTask,
} from './actions';
import { Dictionary } from '@ngrx/entity';

@Injectable()
export class SprintGridFacade {
	public tasks$: Observable<Task[]>;
	public tasksEntities$: Observable<Dictionary<Task>>;
	public dates$: Observable<Timestamp[]>;
	public datesEntities$: Observable<Dictionary<Timestamp>>;

	constructor(private store: Store<SprintGridState>) {
		this.tasks$ = this.store.pipe(select(selectTasks));
		this.tasksEntities$ = this.store.pipe(select(selectTaskEntities));
		this.dates$ = this.store.pipe(select(selectDates));
		this.datesEntities$ = this.store.pipe(select(selectDateEntities));
	}

	public loadTasks(): void {
		this.store.dispatch(new LoadSprintGrid());
	}

	public updateOneTask(task: Task): void {
		this.store.dispatch(new UpdateOneTask({ task }));
	}

	public removeOneTask(task: Task): void {
		this.store.dispatch(new RemoveOneTask({ task }));
	}

	public addOneTask(task: Task): void {
		this.store.dispatch(new AddOneTask({ task }));
	}

	public addOneDate(date: Timestamp): void {
		this.store.dispatch(new AddOneDate({ date }));
	}

	public removeOneDate(date: Timestamp): void {
		this.store.dispatch(new RemoveOneDate({ date }));
	}
}
