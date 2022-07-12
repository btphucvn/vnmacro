import { path } from '../../utils'

export const adminMenu = [
    // { //hệ thống
    //     // name: 'menu.system.header', menus: [
    //     //     {
    //     //         name: 'menu.system.system-administrator.header',
    //     //         subMenus: [
    //     //             { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
    //     //             { name: 'menu.system.system-administrator.product-manage', link: '/system/product-manage' },
    //     //             { name: 'menu.system.system-administrator.register-package-group-or-account', link: '/system/register-package-group-or-account' },
    //     //         ]
    //     //     },
    //     //     // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
    //     // ]
    // },

    { 
        //hệ thống
        name: 'header.gdp-title', menus: [
            {
                name: 'header.gdp.gdp-year', link: path.MACRO+path.GDPYear
            },
            {
                name: 'header.gdp.gdp-hien-hanh', link: '/gdp-hien-hanh'
            },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
        ,linkGroup:path.GDPYear
    },
    { 
        //hệ thống
        name: 'header.cpi-title', menus: [
            {
                name: 'header.cpi.cpi-year', link: '/cpi-year'
            },
            {
                name: 'header.cpi.cpi-hien-hanh', link: '/cpi-hien-hanh'
            },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
        ,linkGroup:"/cpiaaa"
    },
];