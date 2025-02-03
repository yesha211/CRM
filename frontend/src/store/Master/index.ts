import { combineReducers } from '@reduxjs/toolkit'
import reducers, {  MAction_TemplateState } from './MAction_TemplateSlice'
import  { customerSlice } from './customerSlice'
import { useSelector } from 'react-redux'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const reducer = combineReducers({
    customerSlice,MAction_TemplateSlice,
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
       
            MAction_TemplateState: MAction_TemplateState,
            customerSlice : customerSlice
        
    }
> = useSelector

export * from './MAction_TemplateSlice'
export * from './customerSlice'
export { useAppDispatch } from '@/store'
export default reducer