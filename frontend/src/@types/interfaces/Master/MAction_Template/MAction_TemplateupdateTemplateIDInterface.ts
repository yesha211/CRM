export interface MAction_TemplateupdateTemplateID_Req {
    sTemplateGUID?: string
    sTemplate_ID?: string
}

export interface MAction_TemplateupdateTemplateID_Res {
    data?: data_type
    msg?: string
}

interface data_type {
    sTemplate_ID?: string
}
