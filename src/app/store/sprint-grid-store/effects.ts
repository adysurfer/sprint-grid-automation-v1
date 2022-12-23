import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMapTo } from 'rxjs/operators';
import { of } from 'rxjs';
import {
	LoadSprintGridFailure,
	LoadSprintGridSuccess,
	SprintGridActions,
	SprintGridActionTypes,
} from './actions';
import { SprintGridService } from '@services/sprint-grid.service';

@Injectable()
export class SprintGridEffects {
	loadSprintGrid = createEffect(() =>
		this.actions$.pipe(
			ofType(SprintGridActionTypes.LoadSprintGrid),
			switchMapTo(this.sprintGridService.loadTasks()),
			map((tasks) => new LoadSprintGridSuccess({ tasks })),
			catchError(() => of(new LoadSprintGridFailure({ error: 'could not load tasks' }))),
		),
	);

	constructor(
		private actions$: Actions<SprintGridActions>,
		private sprintGridService: SprintGridService,
	) {}
}
