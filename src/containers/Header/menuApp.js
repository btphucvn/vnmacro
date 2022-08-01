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
    {
        //hệ thống
        name: 'header.invest-title', menus: [
            {
                name: 'header.invest.business-registration', link: '/vi-mo/dau-tu/dang-ky-kinh-doanh'
            },
            {
                name: 'header.invest.social-development-investment-capital', link: '/vi-mo/dau-tu/von-dau-tu-phat-trien-xa-hoi'
            },
            {
                name: 'header.invest.investment-from-government', link: '/vi-mo/dau-tu/von-dau-tu-tu-nsnn'
            },
        ]
    },
    {
        //hệ thống
        name: 'header.manufacturing-title', menus: [
            {
                name: 'header.manufacturing.iip', link: '/vi-mo/san-xuat/chi-so-iip-viet-nam'
            },
            {
                name: 'header.manufacturing.product', link: '/vi-mo/san-xuat/san-pham-cong-nghiep'
            },
            {
                name: 'header.manufacturing.price-carriage', link: '/vi-mo/san-xuat/chi-so-van-tai-kho-bai'
            },
            {
                name: 'header.manufacturing.price-input', link: '/vi-mo/san-xuat/chi-so-gia-dau-vao-san-xuat'
            },
            {
                name: 'header.manufacturing.ppi', link: '/vi-mo/san-xuat/chi-so-gia-san-xuat-ppi-viet-nam'
            },
        ]
    },
];