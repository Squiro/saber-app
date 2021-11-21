import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Funcionalidades',
        type     : 'group',
        icon     : 'apps',
        children : [
            {
                id       : 'keypair',
                title    : 'Keypair',
                type     : 'item',
                icon     : 'vpn_key',
                url      : '/keypair',
                exactMatch: true,
            },
            {
                id       : 'encriptar',
                title    : 'Encriptar',
                type     : 'item',
                icon     : 'lock',
                url      : '/encriptar',
                exactMatch: true,
            },
            {
                id       : 'desencriptar',
                title    : 'Desencriptar',
                type     : 'item',
                icon     : 'lock_open',
                url      : '/desencriptar',
                exactMatch: true,
            },
        ]
    },
    {
        id      : 'pages',
        title   : 'Páginas',
        type    : 'group',
        icon    : 'pages',
        children: [           
            {
                id   : 'home',
                title: 'Inicio',
                type : 'item',
                icon : 'home',
                url  : '/home'
            },
            // {
            //     id   : 'login',
            //     title: 'Iniciar sesión',
            //     type : 'item',
            //     icon : 'home',
            //     url  : '/pages/auth/login'
            // },           
        ]
    },  
];
