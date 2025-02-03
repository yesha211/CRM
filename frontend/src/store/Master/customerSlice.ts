import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiDeleteCustomer,
    apigetCustomerByEmail,
    apiGetCustomerData,
    apilistCustomerAll,
    apiCreateCustomer,
    apiUpdateCustomer,
    apiUpdateCustomerByParams,
} from '@/services/Master/apicustomer'

import { DeleteCustomer_Req, } from '@/@types/interfaces/Master/customer/DeleteCustomerInterface'
import { getCustomerByEmail_Req, getCustomerByEmail_Res, } from '@/@types/interfaces/Master/customer/getCustomerByEmailInterface'
import { GetCustomerData_Req, GetCustomerData_Res, } from '@/@types/interfaces/Master/customer/GetCustomerDataInterface'
import { listCustomerAll_Res, } from '@/@types/interfaces/Master/customer/listCustomerAllInterface'
import { CreateCustomer_Req, CreateCustomer_Res, } from '@/@types/interfaces/Master/customer/CreateCustomerInterface'
import { UpdateCustomer_Req, UpdateCustomer_Res, } from '@/@types/interfaces/Master/customer/UpdateCustomerInterface'
import { UpdateCustomerByParams_Req, UpdateCustomerByParams_Res, } from '@/@types/interfaces/Master/customer/UpdateCustomerByParamsInterface'

export const SLICE_NAME = 'customer'


type DeleteCustomer_Req_Data = DeleteCustomer_Req & Record<string, unknown>

export const DeleteCustomer = createAsyncThunk(
    SLICE_NAME + 'DeleteCustomer',
    async (data: DeleteCustomer_Req_Data) => {

        await apiDeleteCustomer(data)
    },
)

type getCustomerByEmail_Req_Data = getCustomerByEmail_Req & Record<string, unknown>

export const getCustomerByEmail = createAsyncThunk(
    SLICE_NAME + 'getCustomerByEmail',
    async (data: getCustomerByEmail_Req_Data) => {

        const response = await apigetCustomerByEmail(data)
        return response.data as getCustomerByEmail_Res
    },
)

type GetCustomerData_Req_Data = GetCustomerData_Req & Record<string, unknown>

export const GetCustomerData = createAsyncThunk(
    SLICE_NAME + 'GetCustomerData',
    async (data: GetCustomerData_Req_Data) => {

        const response = await apiGetCustomerData(data)
        return response.data as GetCustomerData_Res
    },
)


export const listCustomerAll = createAsyncThunk(
    SLICE_NAME + 'listCustomerAll',
    async () => {

        const response = await apilistCustomerAll()
        return response.data as listCustomerAll_Res
    },
)

type CreateCustomer_Req_Data = CreateCustomer_Req & Record<string, unknown>

export const CreateCustomer = createAsyncThunk(
    SLICE_NAME + 'CreateCustomer',
    async (data: CreateCustomer_Req_Data) => {

        const response = await apiCreateCustomer(data)
        return response.data as CreateCustomer_Res
    },
)

type UpdateCustomer_Req_Data = UpdateCustomer_Req & Record<string, unknown>

export const UpdateCustomer = createAsyncThunk(
    SLICE_NAME + 'UpdateCustomer',
    async (data: UpdateCustomer_Req_Data) => {

        const response = await apiUpdateCustomer(data)
        return response.data as UpdateCustomer_Res
    },
)

type UpdateCustomerByParams_Req_Data = UpdateCustomerByParams_Req & Record<string, unknown>

export const UpdateCustomerByParams = createAsyncThunk(
    SLICE_NAME + 'UpdateCustomerByParams',
    async (data: UpdateCustomerByParams_Req_Data) => {

        const response = await apiUpdateCustomerByParams(data)
        return response.data as UpdateCustomerByParams_Res
    },
)


export type customerState = {
    loading: boolean
    getCustomerByEmail_State: getCustomerByEmail_Res
    GetCustomerData_State: GetCustomerData_Res
    listCustomerAll_State: listCustomerAll_Res
    CreateCustomer_State: CreateCustomer_Res
    UpdateCustomer_State: UpdateCustomer_Res
    UpdateCustomerByParams_State: UpdateCustomerByParams_Res
}

const initialState: customerState = {
    loading: true,
    getCustomerByEmail_State: {},
    GetCustomerData_State: {},
    listCustomerAll_State: {},
    CreateCustomer_State: {},
    UpdateCustomer_State: {},
    UpdateCustomerByParams_State: {},
}

const customerSlice = createSlice({
    name: SLICE_NAME,
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder// DeleteCustomer
            .addCase(DeleteCustomer.pending, (state) => {
                state.loading = true
            })
            .addCase(DeleteCustomer.fulfilled, (state) => {

                state.loading = false
            })
            .addCase(DeleteCustomer.rejected, (state) => {
                state.loading = false
            })
            // getCustomerByEmail
            .addCase(getCustomerByEmail.pending, (state) => {
                state.loading = true
            })
            .addCase(getCustomerByEmail.fulfilled, (state, action) => {
                state.getCustomerByEmail_State = action.payload
                state.loading = false
            })
            .addCase(getCustomerByEmail.rejected, (state) => {
                state.loading = false
            })
            // GetCustomerData
            .addCase(GetCustomerData.pending, (state) => {
                state.loading = true
            })
            .addCase(GetCustomerData.fulfilled, (state, action) => {
                state.GetCustomerData_State = action.payload
                state.loading = false
            })
            .addCase(GetCustomerData.rejected, (state) => {
                state.loading = false
            })
            // listCustomerAll
            .addCase(listCustomerAll.pending, (state) => {
                state.loading = true
            })
            .addCase(listCustomerAll.fulfilled, (state, action) => {
                state.listCustomerAll_State = action.payload
                state.loading = false
            })
            .addCase(listCustomerAll.rejected, (state) => {
                state.loading = false
            })
            // CreateCustomer
            .addCase(CreateCustomer.pending, (state) => {
                state.loading = true
            })
            .addCase(CreateCustomer.fulfilled, (state, action) => {
                state.CreateCustomer_State = action.payload
                state.loading = false
            })
            .addCase(CreateCustomer.rejected, (state) => {
                state.loading = false
            })
            // UpdateCustomer
            .addCase(UpdateCustomer.pending, (state) => {
                state.loading = true
            })
            .addCase(UpdateCustomer.fulfilled, (state, action) => {
                state.UpdateCustomer_State = action.payload
                state.loading = false
            })
            .addCase(UpdateCustomer.rejected, (state) => {
                state.loading = false
            })
            // UpdateCustomerByParams
            .addCase(UpdateCustomerByParams.pending, (state) => {
                state.loading = true
            })
            .addCase(UpdateCustomerByParams.fulfilled, (state, action) => {
                state.UpdateCustomerByParams_State = action.payload
                state.loading = false
            })
            .addCase(UpdateCustomerByParams.rejected, (state) => {
                state.loading = false
            })
    },
})
export default customerSlice.reducer