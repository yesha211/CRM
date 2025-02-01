import type { Routes } from '@/@types/routes'
import { lazy } from 'react'

const testingRoute: Routes = [
    {
        key: 'nav.testing',
        path: '/testing/customer',
        component: lazy(() => import('@/views/Testing/customer')),
        authority: [],
    },
]
export default testingRoute
