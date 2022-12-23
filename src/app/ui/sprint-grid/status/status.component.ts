import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SprintGridService } from '@services/sprint-grid.service';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, withLatestFrom } from 'rxjs/operators';
import { Task, Timestamp } from '@models';
import { SprintGridFacade } from '@store/sprint-grid';

interface FormValue {
	statusControl: string;
}

@Component({
	selector: 'app-status',
	templateUrl: './status.component.html',
	styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
	public readonly taskSubject = new BehaviorSubject<Task | null>(null);
	public readonly options: string[];
	public statusForm = new FormGroup({
		statusControl: new FormControl(),
	});
	@Input() date: Timestamp;
	@Input() set task(val: Task) {
		if (!!val && val !== this.taskSubject.getValue()) {
			this.taskSubject.next(val);
		}
	}
	get task$(): Observable<Task> {
		return this.taskSubject.asObservable().pipe(distinctUntilChanged());
	}

	constructor(
		private readonly sprintGridService: SprintGridService,
		private readonly sprintGridFacade: SprintGridFacade,
	) {
		this.options = this.sprintGridService.preferredStatuses;
	}

	ngOnInit(): void {
		this.setStatus();
		this.autoSubmit();
	}

	private setStatus(): void {
		this.task$
			.pipe(map((task) => task.statusMap.get(this.date)))
			.subscribe((status) => this.statusForm.setValue({ statusControl: status ?? '' }));
	}

	private autoSubmit(): void {
		this.statusForm.valueChanges
			.pipe(
				debounceTime(700),
				map((form: FormValue) => form['statusControl']),
				withLatestFrom(this.task$),
			)
			.subscribe(([status, task]) => {
				if (status !== task.statusMap.get(this.date)) {
					const newTask: Task = {
						...task,
						statusMap: new Map(task.statusMap).set(this.date, status),
					};
					this.sprintGridFacade.updateOneTask(newTask);
				}
			});
	}
}
