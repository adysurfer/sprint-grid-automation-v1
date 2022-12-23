import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SprintGridFacade } from './facade';
import { EffectsModule } from '@ngrx/effects';
import { SprintGridEffects } from './effects';
import { StoreModule } from '@ngrx/store';
import { initialSprintGridState, reducer, sprintGridFeatureKey } from './reducer';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		StoreModule.forFeature(sprintGridFeatureKey, reducer, {
			initialState: initialSprintGridState,
		}),
		EffectsModule.forFeature([SprintGridEffects]),
	],
	providers: [SprintGridFacade],
})
export class SprintGridStoreModule {}
