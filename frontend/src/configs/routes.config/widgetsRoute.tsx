import type { Routes } from '@/@types/routes'
import { lazy } from 'react'

const widgetsRoute: Routes = [
    {
        key: 'nav.widgets.cards',
        path: '/widgets/cards',
        component: lazy(() => import('@/views/widgets/cards')),
        authority: [],
    },
    {
        key: 'nav.widgets.timeline',
        path: '/widgets/timeline',
        component: lazy(() => import('@/views/widgets/timeline')),
        authority: [],
    },
    {
        key: 'nav.widgets.counters',
        path: '/widgets/counters',
        component: lazy(() => import('@/views/widgets/counters')),
        authority: [],
    },
]
export default widgetsRoute
