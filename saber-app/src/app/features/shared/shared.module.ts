import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material imports 
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import {ClipboardModule} from '@angular/cdk/clipboard'; 

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';

import { FormErrorComponent } from './components/form-error/form-error.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
    declarations: [
        FormErrorComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatSortModule,
        MatCheckboxModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatSelectModule,
        MatExpansionModule,
        MatCardModule,
        MatTableModule,
        MatMomentDateModule,
        FormsModule,
        ReactiveFormsModule,        
        ScrollingModule,
        ClipboardModule,

        FuseSharedModule,
        FuseSidebarModule,
        FuseConfirmDialogModule
    ],
    exports: [
        CommonModule, 
        NgxDatatableModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatExpansionModule,
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatRippleModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatSelectModule,
        MatCardModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        ClipboardModule,
        ScrollingModule,        

        FuseSharedModule,
        FuseSidebarModule,
        FuseConfirmDialogModule,

        FormErrorComponent
    ],
    providers: [

    ],
})
export class SharedModule { }
