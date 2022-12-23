import { Component, OnInit } from '@angular/core';
import { SprintGridFacade } from '@store/sprint-grid';
import { Task, Timestamp } from '@models';
import { BaseAddComponent } from '@extended-components';

interface FormValue {
	addControl: string;
}

@Component({
	selector: 'app-task-add',
	templateUrl: './task-add.component.html',
	styleUrls: ['./task-add.component.scss'],
})
export class TaskAddComponent extends BaseAddComponent implements OnInit {
	constructor(sprintGridFacade: SprintGridFacade) {
		super(sprintGridFacade);
	}

	ngOnInit(): void {
		this.addControl.setAsyncValidators(
			this.uniqueValidator<Task>(this.sprintGridFacade.tasksEntities$),
		);
	}

	submit(): void {
		if (this.addForm.valid && this.addForm.dirty) {
			const formValue = this.addForm.value as FormValue;
			const newTask: Task = {
				name: formValue.addControl,
				statusMap: new Map<Timestamp, string>(),
			};
			this.sprintGridFacade.addOneTask(newTask);
			this.addForm.markAsPristine();
			this.addForm.markAsUntouched();
		}
	}
}
