import { combineReducers } from '@reduxjs/toolkit'
import reducers, {
    SLICE_NAME,
    MAction_TemplateState,
} from './MAction_TemplateSlice'
import { useSelector } from 'react-redux'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const reducer = combineReducers({
    data: reducers,
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {
            data: MAction_TemplateState
        }
    }
> = useSelector

export * from './MAction_TemplateSlice'
export { useAppDispatch } from '@/store'
export default reducer
