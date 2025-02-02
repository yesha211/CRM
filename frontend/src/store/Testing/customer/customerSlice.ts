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

export type ApiResponse<T> = {
    status?: string
    message?: string
    data?: T
}

export type CustomerState = {
    loading: boolean
    customers: ApiResponse<Customer[]>
    customerByEmail: ApiResponse<Customer>
    customerData: ApiResponse<Customer>
    createdCustomer: ApiResponse<Customer>
    updatedCustomer: ApiResponse<Customer>
    updatedCustomerByParams: ApiResponse<Customer>
    deleteResponse: ApiResponse<null>
}

export const SLICE_NAME = 'customer'

// Fetch all customers
export const getAllCustomers = createAsyncThunk(
    SLICE_NAME + '/getAll',
    async () => {
        const response = await apiListAllCustomers()
        return response.data as ApiResponse<Customer[]>
    },
)

// Fetch customer by email
export const getCustomerByEmail = createAsyncThunk(
    SLICE_NAME + '/getByEmail',
    async (data: { sEmail: string }) => {
        const response = await apiGetCustomerByEmail(data)
        return response.data as ApiResponse<Customer>
    },
)

// Fetch customer data by GUID
export const getCustomerData = createAsyncThunk(
    SLICE_NAME + '/getByGUID',
    async (data: { sCustomerGUID: string }) => {
        const response = await apiGetCustomerData(data)
        return response.data as ApiResponse<Customer>
    },
)

export type CustomerData = Customer & Record<string, unknown>

// Create a new customer
export const createCustomer = createAsyncThunk(
    SLICE_NAME + '/create',
    async (data: CustomerData) => {
        const response = await apiCreateCustomer(data)
        return response.data as ApiResponse<Customer>
    },
)

// Update customer
export const updateCustomer = createAsyncThunk(
    SLICE_NAME + '/update',
    async (data: CustomerData) => {
        const response = await apiUpdateCustomer(data)
        return response.data as ApiResponse<Customer>
    },
)

// Update customer by parameters
export const updateCustomerByParams = createAsyncThunk(
    SLICE_NAME + '/updateByParams',
    async (data: CustomerData) => {
        const response = await apiUpdateCustomerByParams(data)
        return response.data as ApiResponse<Customer>
    },
)

// Delete customer
export const deleteCustomer = createAsyncThunk(
    SLICE_NAME + '/delete',
    async (data: { sCustomerGUID: string }) => {
        const response = await apiDeleteCustomer(data)
        return response.data as ApiResponse<null>
    },
)

const initialState: CustomerState = {
    loading: true,
    customers: {},
    customerByEmail: {},
    customerData: {},
    createdCustomer: {},
    updatedCustomer: {},
    updatedCustomerByParams: {},
    deleteResponse: {},
}

const customerSlice = createSlice({
    name: SLICE_NAME,
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // getAllCustomers
            .addCase(getAllCustomers.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllCustomers.fulfilled, (state, action) => {
                state.customers = action.payload
                state.loading = false
            })
            .addCase(getAllCustomers.rejected, (state) => {
                state.loading = false
            })

            // getCustomerData
            .addCase(getCustomerData.pending, (state) => {
                state.loading = true
            })
            .addCase(getCustomerData.fulfilled, (state, action) => {
                state.customerData = action.payload
                state.loading = false
            })
            .addCase(getCustomerData.rejected, (state) => {
                state.loading = false
            })

            // getCustomerByEmail
            .addCase(getCustomerByEmail.pending, (state) => {
                state.loading = true
            })
            .addCase(getCustomerByEmail.fulfilled, (state, action) => {
                state.customerByEmail = action.payload
                state.loading = false
            })
            .addCase(getCustomerByEmail.rejected, (state) => {
                state.loading = false
            })

            // createCustomer
            .addCase(createCustomer.pending, (state) => {
                state.loading = true
            })
            .addCase(createCustomer.fulfilled, (state, action) => {
                state.createdCustomer = action.payload
                state.loading = false
            })
            .addCase(createCustomer.rejected, (state) => {
                state.loading = false
            })

            // updateCustomer
            .addCase(updateCustomer.pending, (state) => {
                state.loading = true
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                state.updatedCustomer = action.payload
                state.loading = false
            })
            .addCase(updateCustomer.rejected, (state) => {
                state.loading = false
            })

            // updateCustomerByParams
            .addCase(updateCustomerByParams.pending, (state) => {
                state.loading = true
            })
            .addCase(updateCustomerByParams.fulfilled, (state, action) => {
                state.updatedCustomerByParams = action.payload
                state.loading = false
            })
            .addCase(updateCustomerByParams.rejected, (state) => {
                state.loading = false
            })

            // deleteCustomer
            .addCase(deleteCustomer.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.deleteResponse = action.payload
                state.loading = false
            })
            .addCase(deleteCustomer.rejected, (state) => {
                state.loading = false
            })
    },
})

export default customerSlice.reducer
