import ApiService from '@/services/ApiService'

export async function apiDelete<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<T>({
        url: `/mactiontemplate/delete?sTemplateGUID=${data.sTemplateGUID}`,
        method: 'delete',
        data,
    })
}
export async function apiGet<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<T>({
        url: `/get/sTemplateGUID/${data.sTemplateGUID}`,
        method: 'get',
        data,
    })
}
export async function apigetTemplateFile<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchData<T>({
        url: `/gettemplatefile`,
        method: 'get',
        data,
    })
}
export async function apilistTemplates<T>() {
    return ApiService.fetchData<T>({
        url: `/listtemplates`,
        method: 'get',
    })
}
export async function apilistTemplatesALL<T>() {
    return ApiService.fetchData<T>({
        url: `/mactiontemplate/listtemplatesall`,
        method: 'get',
    })
}
export async function apiCreate<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<T>({
        url: `/mactiontemplate/create`,
        method: 'post',
        data,
    })
}
export async function apisetTemplateInActive<
    T,
    U extends Record<string, unknown>,
>(data: U) {
    return ApiService.fetchData<T>({
        url: `/settemplateinactive`,
        method: 'post',
        data,
    })
}
export async function apiUpdate<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<T>({
        url: `/update`,
        method: 'put',
        data,
    })
}
