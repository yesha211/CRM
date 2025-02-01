import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiCreateCustomer,
    apiDeleteCustomer,
    apiGetCustomerByEmail,
    apiGetCustomerData,
    apiListAllCustomers,
    apiUpdateCustomer,
    apiUpdateCustomerByParams,
} from '@/services/Testing/CustomerServices'

import { Customer } from '@/@types/interfaces/Testing/customer'

export type CustomerState = {
    loading: boolean
    customers: Customer[]
    customerByEmail: Customer
    customerData: Customer
}

export const SLICE_NAME = 'customer'

export const getAllCustomers = createAsyncThunk(
    SLICE_NAME + '/getAll',
    async () => {
        const response = await apiListAllCustomers()
        return response.data
    },
)

export const getCustomerByEmail = createAsyncThunk(
    SLICE_NAME + '/getByEmail',
    async (data: { sEmail: string }) => {
        const response = await apiGetCustomerByEmail(data)
        return response.data
    },
)

export const getCustomerData = createAsyncThunk(
    SLICE_NAME + '/getByGUID',
    async (sCustomerGUID: string) => {
        const response = await apiGetCustomerData(sCustomerGUID)
        return response.data
    },
)

export const createCustomer = async (data: Customer) => {
    const response = await apiCreateCustomer(data)
    return response.data
}

export const updateCustomer = async (data: Customer) => {
    const response = await apiUpdateCustomer(data)
    return response.data
}

export const updateCustomerByParams = async (data: {
    sCustomerGUID: string
}) => {
    const response = await apiUpdateCustomerByParams(data)
    return response.data
}

export const deleteCustomer = async (data: { sCustomerGUID: string }) => {
    const response = await apiDeleteCustomer(data)
    return response.data
}

const initialState: CustomerState = {
    loading: true,
    customers: [],
    customerByEmail: {},
    customerData: {},
}

const customerSlice = createSlice({
    name: SLICE_NAME,
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCustomers.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllCustomers.fulfilled, (state, action) => {
                state.customers = action.payload
                state.loading = false
            })
            .addCase(getCustomerData.pending, (state) => {
                state.loading = true
            })
            .addCase(getCustomerData.fulfilled, (state, action) => {
                state.customerData = action.payload
                state.loading = false
            })
            .addCase(getCustomerByEmail.pending, (state) => {
                state.loading = true
            })
            .addCase(getCustomerByEmail.fulfilled, (state, action) => {
                state.customerByEmail = action.payload
                state.loading = false
            })
    },
})

export default customerSlice.reducer
