import type { Routes } from '@/@types/routes'
import authRoute from './authRoute'
import homeRoute from './homeRoute'
import testingRoute from './testingRoute'

export const publicRoutes: Routes = [...authRoute]
export const protectedRoutes: Routes = [...homeRoute, ...testingRoute]
