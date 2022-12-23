import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SprintGridModule } from './ui/sprint-grid/sprint-grid.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RootStoreModule } from '@store';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		SprintGridModule,
		BrowserAnimationsModule,
		RootStoreModule,
		MatGridListModule,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
