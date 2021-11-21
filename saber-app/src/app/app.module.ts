import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeES from '@angular/common/locales/es';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from 'app/app.component';
import { fuseConfig } from 'app/fuse-config';
import { LayoutModule } from 'app/layout/layout.module';
import { appRoutes } from './app.routes';
import { EncriptarComponent } from './features/encriptar/encriptar.component';
import { SharedModule } from './features/shared/shared.module';
import { KeypairComponent } from './features/keypair/keypair.component';
import { DesencriptarComponent } from './features/desencriptar/desencriptar.component';


registerLocaleData(localeES, 'es');

@NgModule({
    declarations: [
        AppComponent,
        EncriptarComponent,
        KeypairComponent,
        DesencriptarComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
 
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        SharedModule,
    ],
    bootstrap   : [
        AppComponent
    ],
    providers: [
    ]
})
export class AppModule
{
}
