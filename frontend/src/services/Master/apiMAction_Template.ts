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
        url: `/mactiontemplate/get/sTemplateGUID/${data.sTemplateGUID}`,
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
        url: `/mactiontemplate/listtemplates`,
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
        url: `/mactiontemplate/update`,
        method: 'put',
        data,
    })
}

export async function apiupdateStatus<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchData<T>({
        url: `/mactiontemplate/updatestatus`,
        method: 'put',
        data,
    })
}

export async function apiupdatebInActive<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchData<T>({
        url: '/mactiontemplate/updatebinactive',
        method: 'put',
        data,
    })
}
