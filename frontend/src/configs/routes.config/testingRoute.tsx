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
    {
        key: 'nav.testing.templateListInput',
        path: '/testing/templateListInput',
        component: lazy(() => import('@/views/Testing/templateListInput')),
        authority: [],
    },
    {
        key: 'nav.testing.templateListCHK',
        path: '/testing/templateListCHK',
        component: lazy(() => import('@/views/Testing/templateListCHK')),
        authority: [],
    },
    {
        key: 'nav.testing.templateListCHKSingle',
        path: '/testing/templateListCHKSingle',
        component: lazy(() => import('@/views/Testing/templateListCHKSingle')),
        authority: [],
    },
    {
        key: 'nav.testing.templateDetailNoForm',
        path: '/testing/templateDetailNoForm',
        component: lazy(() => import('@/views/Testing/templateNoForm')),
        authority: [],
    },
    {
        key: 'nav.testing.templateDetailNoFormState',
        path: '/testing/templateDetailNoFormState',
        component: lazy(() => import('@/views/Testing/templateNoFormState')),
        authority: [],
    },
    {
        key: 'nav.testing.templateDetailFormik',
        path: '/testing/templateDetailFormik',
        component: lazy(() => import('@/views/Testing/templateFormik')),
        authority: [],
    },
    {
        key: 'nav.testing.userPermission',
        path: '/testing/userPermission',
        component: lazy(() => import('@/views/Testing/UserPermission')),
        authority: [],
    },
]
export default testingRoute
