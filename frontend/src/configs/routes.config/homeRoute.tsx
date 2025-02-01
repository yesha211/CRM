import { lazy } from 'react'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const homeRoute: Routes = [
    {
        key: 'home.index',
        path: '/home',
        component: lazy(() => import('@/views/home')),
        authority: [ADMIN, USER],
    },
]

export default homeRoute
