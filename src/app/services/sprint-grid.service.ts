import { Injectable } from '@angular/core';
import { Task, Timestamp } from '@models';
import { Observable, of } from 'rxjs';

const initialDates: Timestamp[] = [new Date(2020, 5, 1).getTime(), new Date(2020, 4, 2).getTime()];

const initialTasks: Task[] = [
	{
		name: 'Task 1',
		statusMap: new Map([[initialDates[0], 'In Progress']]),
	},
	{
		name: 'Task 2',
		statusMap: new Map([[initialDates[1], 'Blocked']]),
	},
	{
		name: 'Task 3',
		statusMap: new Map([
			[initialDates[0], 'In Progress'],
			[initialDates[1], 'Blocked'],
		]),
	},
];

const preferredStatuses = ['To Do', 'In Progress', 'In Testing', 'Done', 'Blocked'];

@Injectable({
	providedIn: 'root',
})
export class SprintGridService {
	public preferredStatuses = preferredStatuses;

	public loadTasks(): Observable<Task[]> {
		return of(initialTasks);
	}
}
