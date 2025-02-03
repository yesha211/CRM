import ApiService from '@/services/ApiService'

export async function apiDeleteCustomer<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<T>({
        url: `/deletecustomer`,
        method: 'delete',
        data
    })
} export async function apigetCustomerByEmail<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<T>({
        url: `/getcustomerbyemail?sEmail=${data.sEmail}`,
        method: 'get',
        data
    })
} export async function apiGetCustomerData<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<T>({
        url: `/getcustomerdata/sCustomerGUID/${data.sCustomerGUID}`,
        method: 'get',
        data
    })
} export async function apilistCustomerAll<T>() {
    return ApiService.fetchData<T>({
        url: `/listallcustomer`,
        method: 'get',

    })
} export async function apiCreateCustomer<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<T>({
        url: `/createcustomer`,
        method: 'post',
        data
    })
} export async function apiUpdateCustomer<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<T>({
        url: `/updatecustomer`,
        method: 'put',
        data
    })
} export async function apiUpdateCustomerByParams<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<T>({
        url: `/updatecustomerbypara/sCustomerGUID/${data.sCustomerGUID}`,
        method: 'put',
        data
    })
}