import { Customer, CustomerTypeRes } from '@/@types/interfaces/Testing/customer'
import ApiService from '../ApiService'

export async function apiCreateCustomer(data: Customer) {
    return ApiService.fetchData<CustomerTypeRes>({
        url: '/customer/createcustomer',
        method: 'post',
        data: data as Record<string, unknown>,
    })
}

export async function apiDeleteCustomer(data: { sCustomerGUID: string }) {
    return ApiService.fetchData({
        url: '/customer/deletecustomer',
        method: 'delete',
        data,
    })
}

export async function apiGetCustomerByEmail(data: { sEmail: string }) {
    return ApiService.fetchData<Customer>({
        url: '/customer/getcustomerbyemail?email=' + data.sEmail,
        method: 'get',
        data,
    })
}

export async function apiGetCustomerData(sCustomerGUID: string) {
    return ApiService.fetchData<Customer>({
        url: `/customer/getcustomerdata/sCustomerGUID/${sCustomerGUID}`,
        method: 'get',
    })
}

export async function apiListAllCustomers() {
    return ApiService.fetchData<Customer[]>({
        url: '/customer/listallcustomer',
        method: 'get',
    })
}

export async function apiUpdateCustomer(data: Customer) {
    return ApiService.fetchData({
        url: '/customer/updatecustomer',
        method: 'put',
        data,
    })
}

export async function apiUpdateCustomerByParams(data: {
    sCustomerGUID: string
}) {
    return ApiService.fetchData<Customer>({
        url: `/customer/updatecustomerbypara/sCustomerGUID/${data.sCustomerGUID}`,
        method: 'put',
        data,
    })
}
