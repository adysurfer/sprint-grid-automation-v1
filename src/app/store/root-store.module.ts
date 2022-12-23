import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { appReducers, initialAppState } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { FeatureStoreModule } from './feature-store.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		StoreModule.forRoot(appReducers, { initialState: initialAppState }),
		EffectsModule.forRoot([]),
		FeatureStoreModule,
		StoreDevtoolsModule.instrument(),
	],
})
export class RootStoreModule {}
