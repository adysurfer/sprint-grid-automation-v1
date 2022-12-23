import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { MatTableModule } from '@angular/material/table';
import { StatusComponent } from './status/status.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TaskAddComponent } from './task-add/task-add.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DateAddComponent } from './date-add/date-add.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
	declarations: [GridComponent, StatusComponent, TaskAddComponent, DateAddComponent],
	exports: [GridComponent],
	imports: [
		CommonModule,
		MatTableModule,
		ReactiveFormsModule,
		MatAutocompleteModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatButtonModule,
		MatTooltipModule,
		MatDatepickerModule,
		MatMomentDateModule,
		MatExpansionModule,
	],
})
export class SprintGridModule {}
