export interface Get_Req {
    sTemplateGUID?: string
}

export interface Get_Res {
    data?: data_type
}

interface data_type {
    bInActive?: boolean
    sFile_to_Send?: string
    sMessage_to_send?: string
    sTemplate_ID?: string
    sTemplate_Send_via?: string
    sTemplateGUID?: string
}
