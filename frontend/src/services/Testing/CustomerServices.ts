import ApiService from '../ApiService'

export async function apiCreateCustomer<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchData<T>({
        url: '/customer/createcustomer',
        method: 'post',
        data,
    })
}

export async function apiDeleteCustomer<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchData<T>({
        url: '/customer/deletecustomer',
        method: 'delete',
        data,
    })
}

export async function apiGetCustomerByEmail<
    T,
    U extends Record<string, unknown>,
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/customer/getcustomerbyemail?sEmail=' + data.sEmail,
        method: 'get',
        data,
    })
}

export async function apiGetCustomerData<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchData<T>({
        url: `/customer/getcustomerdata/sCustomerGUID/${data.sCustomerGUID}`,
        method: 'get',
    })
}

export async function apiListAllCustomers<T>() {
    return ApiService.fetchData<T>({
        url: '/customer/listallcustomer',
        method: 'get',
    })
}

export async function apiUpdateCustomer<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchData<T>({
        url: '/customer/updatecustomer',
        method: 'put',
        data,
    })
}

export async function apiUpdateCustomerByParams<
    T,
    U extends Record<string, unknown>,
>(data: U) {
    return ApiService.fetchData<T>({
        url: `/customer/updatecustomerbypara/sCustomerGUID/${data.sCustomerGUID}`,
        method: 'put',
        data,
    })
}
