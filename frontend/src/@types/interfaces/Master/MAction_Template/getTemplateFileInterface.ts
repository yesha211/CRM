export interface getTemplateFile_Req {
sTemplateGUID ?: string
}

export interface getTemplateFile_Res {
data ?: data_type
}

interface data_type{
sFile_to_Send ?: string
sTemplateGUID ?: string

}

