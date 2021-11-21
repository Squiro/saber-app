import { Routes } from '@angular/router';
import { EncriptarComponent } from './features/encriptar/encriptar.component';
import { KeypairComponent } from './features/keypair/keypair.component';
import { DesencriptarComponent } from './features/desencriptar/desencriptar.component';

export const appRoutes: Routes = [
    {
        path        : 'home',
        loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'encriptar',
        component: EncriptarComponent
    },
    {
        path: 'desencriptar',
        component: DesencriptarComponent
    },
    {
        path: 'keypair',
        component: KeypairComponent
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
