import { NgModule } from "@angular/core";
import {CdkTableModule} from "@angular/cdk/table";

import {
    MatButtonModule, MatCheckboxModule, MatInputModule, MatChipsModule, MatSlideToggleModule, MatRadioModule,
    MatTabsModule, MatCardModule, MatButtonToggleModule, MatProgressBarModule, MatSidenavModule, MatToolbarModule,
    MatIconModule, MatTableModule, MatCommonModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule,
    MatSnackBarModule, MatSliderModule, MatListModule, MatOptionModule, MatRippleModule, MatGridListModule, MatPaginatorModule,
    MatAutocompleteModule, MatFormFieldModule, MatPseudoCheckboxModule, MatSortModule, MatProgressSpinnerModule,MatExpansionModule
} from  "@angular/material";

let materialModules = [
    MatButtonModule, MatCheckboxModule, MatInputModule, MatChipsModule, MatSlideToggleModule, MatRadioModule,
    MatTabsModule, MatCardModule, MatButtonToggleModule, MatProgressBarModule, MatSidenavModule, MatToolbarModule,
    MatIconModule, MatTableModule, MatCommonModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule,
    MatSnackBarModule, MatSliderModule, MatListModule, MatOptionModule, MatRippleModule, MatGridListModule, MatPaginatorModule,
    MatAutocompleteModule, MatFormFieldModule, MatPseudoCheckboxModule, MatSortModule, MatProgressSpinnerModule,
    CdkTableModule,MatExpansionModule
];

@NgModule({
    imports: materialModules,
    exports: materialModules
})
export default class MaterialComponents
{
}


