export interface MAction_TemplateupdatebInActive_Req {
    sTemplateGUID?: string
    bInActive?: boolean
}

export interface MAction_TemplateupdatebInActive_Res {
    data?: data_type
    msg?: string
}

interface data_type {
    bInActive?: boolean
}
