import {
    address,
    SocialAccounts,
    geoLocation
}
    from "@/@types/interfaces/JSON_ObjectInterface"

export interface CreateCustomer_Req {
    sAddress?: address
    sCustomerName?: string
    sEmail?: string
    sLanguage?: string
    sMobileNumber?: string
    sSocialAccounts?: SocialAccounts
}

export interface CreateCustomer_Res {
    data?: data_type
    json_variable?: geoLocation
    req_var?: address
    sOTP?: string
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

