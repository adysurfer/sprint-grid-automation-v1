import { Directive } from '@angular/core';
import {
	AbstractControl,
	AsyncValidatorFn,
	FormControl,
	FormGroup,
	ValidationErrors,
	Validators,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { SprintGridFacade } from '@store/sprint-grid';
import { Dictionary } from '@ngrx/entity';
import { catchError, debounceTime, map, take } from 'rxjs/operators';
import { isMoment, Moment } from 'moment';

export interface FormValue {
	addControl: Moment | string;
}

const notUnique: ValidationErrors = { notUnique: true };

@Directive()
export class BaseAddComponent {
	public formOpened = false;
	public addForm: FormGroup;

	constructor(public readonly sprintGridFacade: SprintGridFacade) {
		this.formOpened = false;
		this.addForm = new FormGroup({
			addControl: new FormControl('', Validators.required.bind(Validators)),
		});
	}

	toggleForm(): void {
		this.formOpened = !this.formOpened;
	}

	get addControl(): AbstractControl {
		return this.addForm.get('addControl');
	}

	uniqueValidator<T>(entites$: Observable<Dictionary<T>>): AsyncValidatorFn {
		return function (control: AbstractControl): Observable<null | ValidationErrors> {
			const value = isMoment(control.value) ? +control.value : (control.value as string);
			return entites$.pipe(
				debounceTime(300),
				take(1),
				map((entities) => (!!entities[value] ? notUnique : null)),
				catchError(() => of(notUnique)),
			);
		};
	}
}
