import { Action } from '@ngrx/store';
import { Task, Timestamp } from '@models';

export enum SprintGridActionTypes {
	LoadSprintGrid = '[Sprint Grid] Load SprintGrid',
	LoadSprintGridSuccess = '[Sprint Grid] Load SprintGrid Success',
	LoadSprintGridFailure = '[Sprint Grid] Load SprintGrid Failure',
	UpdateOneTask = '[Sprint Grid] Update One Task',
	RemoveOneTask = '[Sprint Grid] Remove One Task',
	AddOneTask = '[Sprint Grid] Add One Task',
	AddOneDate = '[Sprint Grid] Add One Date',
	RemoveOneDate = '[Sprint Grid] Remove One Date',
}

export class LoadSprintGrid implements Action {
	readonly type = SprintGridActionTypes.LoadSprintGrid;
}

export class LoadSprintGridSuccess implements Action {
	readonly type = SprintGridActionTypes.LoadSprintGridSuccess;
	constructor(public payload: { tasks: Task[] }) {}
}

export class LoadSprintGridFailure implements Action {
	readonly type = SprintGridActionTypes.LoadSprintGridFailure;
	constructor(public payload: { error: any }) {}
}

export class UpdateOneTask implements Action {
	readonly type = SprintGridActionTypes.UpdateOneTask;
	constructor(public payload: { task: Task }) {}
}

export class RemoveOneTask implements Action {
	readonly type = SprintGridActionTypes.RemoveOneTask;
	constructor(public payload: { task: Task }) {}
}

export class AddOneTask implements Action {
	readonly type = SprintGridActionTypes.AddOneTask;
	constructor(public payload: { task: Task }) {}
}

export class AddOneDate implements Action {
	readonly type = SprintGridActionTypes.AddOneDate;
	constructor(public payload: { date: Timestamp }) {}
}

export class RemoveOneDate implements Action {
	readonly type = SprintGridActionTypes.RemoveOneDate;
	constructor(public payload: { date: Timestamp }) {}
}

export type SprintGridActions =
	| LoadSprintGrid
	| LoadSprintGridSuccess
	| LoadSprintGridFailure
	| UpdateOneTask
	| RemoveOneTask
	| AddOneTask
	| AddOneDate
	| RemoveOneDate;
