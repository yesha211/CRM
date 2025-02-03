export interface Update_Req {
bInActive ?: boolean
sMessage_to_send ?: string
sTemplate_ID ?: string
sTemplate_Send_via ?: string
sTemplateGUID ?: string
}

export interface Update_Res {
data ?: data_type
}

interface data_type{
bInActive ?: boolean
sFile_to_Send ?: string
sMessage_to_send ?: string
sTemplate_ID ?: string
sTemplate_Send_via ?: string

}

