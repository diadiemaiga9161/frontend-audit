import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 11,
        label: 'Dashboards',
        icon: 'bx-home-circle',
        link: '/accueil1',
        
    },

    {
        id: 11,
        label: 'Campagnes',
        icon: 'bx bx-news',
        link: '/campagnes',
        
    },
    {
        id: 2,
        label: 'Audit',
        icon: 'bx bxs-file',
        subItems: [
            {
                id: 4,
                label: 'Gestion des audits',
                link: '/gestionsaudites',
                parentId: 2
            },
            {
                id: 5,
                label: 'Audits en cours',
                link: '/audits-cours',
                parentId: 2
            },
        ]
    },

    {
        id: 2,
        label: 'Référentiels',
        icon: 'bx bx-list-ol',
        subItems: [
            {
                id: 3,
                label: 'Référentiels',
                link: '/referentiels',
                parentId: 2
            },
            {
                id: 3,
                label: 'Statistiquesbeta',
                link: '/statistiquesbeta',
                parentId: 2
            },
            {
                id: 4,
                label: 'Cross-référentiels',
                link: '/crossreferentiels',
                parentId: 2
            },
        ]
    },

    {
        id: 11,
        label: 'Audités',
        icon: 'bx bx-user',
        link: '/audites',
        
    },

    {
        id: 11,
        label: 'Échelles',
        icon: 'bx bxs-bar-chart-alt-2',
        link: '/echelles',
        
    },


    {
        id: 8,
        isLayout: true
    },
    {
        id: 9,
        label: 'Profile',
        isTitle: true
    },
    {
        id: 10,
        label: 'Gestion-Profile',
        icon: 'bx bx-user-circle',
        link: '/profile',
    },
];

