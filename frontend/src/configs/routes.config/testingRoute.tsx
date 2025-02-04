import type { Routes } from '@/@types/routes'
import { lazy } from 'react'

const testingRoute: Routes = [
    {
        key: 'nav.testing.customer',
        path: '/testing/customer',
        component: lazy(() => import('@/views/Testing/customer')),
        authority: [],
    },
    {
        key: 'nav.testing.template',
        path: '/testing/template',
        component: lazy(() => import('@/views/Testing/template')),
        authority: [],
    },
    {
        key: 'nav.testing.templateList',
        path: '/testing/templateList',
        component: lazy(() => import('@/views/Testing/templateList')),
        authority: [],
    },
]
export default testingRoute
