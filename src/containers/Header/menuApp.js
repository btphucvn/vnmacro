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
                name: 'header.gdp.gdp-year', link: "/vi-mo/san-luong/gdp-viet-nam-theo-nam"
            },
            {
                name: 'header.gdp.gdp-compare', link: '/vi-mo/san-luong/gdp-viet-nam-so-sanh'
            },
            {
                name: 'header.gdp.gdp-current', link: '/vi-mo/san-luong/gdp-viet-nam-hien-hanh'
            },
            {
                name: 'header.gdp.gdp-pmi', link: "/vi-mo/san-luong/chi-so-pmi-viet-nam"
            },
        ]
    },
    {
        //hệ thống
        name: 'header.consumption-title', menus: [
            {
                name: 'header.consumption.cpi', link: '/vi-mo/tieu-dung/chi-so-cpi-viet-nam'
            },
            {
                name: 'header.consumption.retail', link: '/vi-mo/tieu-dung/ban-le-hang-hoa-va-dich-vu'
            },
        ]
    },
];