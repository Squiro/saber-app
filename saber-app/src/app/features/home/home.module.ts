import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { HomeComponent } from './home.component';
import { HomeRoutes } from './home.routes';
import { SharedModule } from 'app/features/shared/shared.module';



@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        RouterModule.forChild(HomeRoutes),
        SharedModule,
        FuseSharedModule,        
    ]
})
export class HomeModule {
}
