import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MapComponent} from "./map.component";
import {MapService} from "./map.service";


@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        MapComponent
    ],
    providers: [
        MapService
    ],
    exports: [
        MapComponent
    ]
})
export class MapsModule {
}
