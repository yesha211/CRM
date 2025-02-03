import {
    address,
    SocialAccounts
}
    from "@/@types/interfaces/JSON_ObjectInterface"

export interface GetCustomerData_Req {
    sCustomerGUID?: string
}

export interface GetCustomerData_Res {
    data?: data_type
}

interface data_type {
    sAddress?: address
    sCustomerGUID?: string
    sCustomerName?: string
    sEmail?: string
    sLanguage?: string
    sMobileNumber?: string
    sSocialAccounts?: SocialAccounts

}

