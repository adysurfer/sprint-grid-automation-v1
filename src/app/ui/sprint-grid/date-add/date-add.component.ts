import { Component, OnInit } from '@angular/core';
import { BaseAddComponent, FormValue } from '@extended-components';
import { SprintGridFacade } from '@store/sprint-grid';
import { Timestamp } from '@models';

@Component({
	selector: 'app-date-add',
	templateUrl: './date-add.component.html',
	styleUrls: ['./date-add.component.scss'],
})
export class DateAddComponent extends BaseAddComponent implements OnInit {
	constructor(sprintGridFacade: SprintGridFacade) {
		super(sprintGridFacade);
	}

	ngOnInit(): void {
		this.addControl.setAsyncValidators(
			this.uniqueValidator<Timestamp>(this.sprintGridFacade.datesEntities$),
		);
		this.addControl.statusChanges.subscribe(() => console.log(this.addControl.errors));
	}

	submit(): void {
		if (this.addForm.valid && this.addForm.dirty) {
			const date: Timestamp = +(this.addForm.value as FormValue).addControl;
			this.sprintGridFacade.addOneDate(date);
			this.addForm.markAsPristine();
			this.addForm.markAsUntouched();
		}
	}
}
