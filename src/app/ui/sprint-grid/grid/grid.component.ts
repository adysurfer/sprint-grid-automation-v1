import { Component, OnInit } from '@angular/core';
import { SprintGridFacade } from '@store/sprint-grid';
import { Observable } from 'rxjs';
import { Task, Timestamp } from '@models';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-grid',
	templateUrl: './grid.component.html',
	styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
	public tasks$: Observable<Task[]>;
	public dates$: Observable<Timestamp[]>;
	public columns$: Observable<(string | Timestamp)[]>;
	public hoveredTask: Task | null = null;
	public hoveredDate: Timestamp | null = null;

	constructor(public readonly sprintGridFacade: SprintGridFacade) {}

	ngOnInit(): void {
		this.sprintGridFacade.loadTasks();
		this.tasks$ = this.sprintGridFacade.tasks$;
		this.dates$ = this.sprintGridFacade.dates$;
		this.columns$ = this.dates$.pipe(map((dates) => this.viewColumns(dates)));
	}

	public viewColumns(dates: Timestamp[]): (string | Timestamp)[] {
		const datesSorted = [...dates].sort((a, b) => a - b);
		const strDates = datesSorted.map((d) => d.toString(10));
		return ['name', ...strDates];
	}

	public hoverTask(task: Task): void {
		this.hoveredTask = task;
	}

	public leaveTask(): void {
		this.hoveredTask = null;
	}

	public removeTask(task: Task): void {
		this.sprintGridFacade.removeOneTask(task);
	}

	public hoverDate(date: Timestamp): void {
		this.hoveredDate = date;
	}

	public leaveDate(): void {
		this.hoveredDate = null;
	}

	public removeDate(date: Timestamp): void {
		this.sprintGridFacade.removeOneDate(date);
	}
}
