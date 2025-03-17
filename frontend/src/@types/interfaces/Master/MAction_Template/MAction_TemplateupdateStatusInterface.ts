import { template_obj } from '@/@types/interfaces/JSON_ObjectInterface'

export interface MAction_TemplateupdateStatus_Req {
    bInActive?: number
    data?: template_obj[]
}

export interface MAction_TemplateupdateStatus_Res {
    msg?: string
}
