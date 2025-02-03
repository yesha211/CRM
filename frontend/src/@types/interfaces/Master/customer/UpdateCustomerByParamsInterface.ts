import {
address,
SocialAccounts}
from "@/@types/interfaces/JSON_ObjectInterface"

export interface UpdateCustomerByParams_Req {
sAddress ?: address
sCustomerName ?: string
sEmail ?: string
sLanguage ?: string
sMobileNumber ?: string
sSocialAccounts ?: SocialAccounts
bInActive ?: boolean
sCustomerGUID ?: string
}

export interface UpdateCustomerByParams_Res {
data ?: data_type
}

interface data_type{
bInActive ?: boolean
sAddress ?: address
sCustomerName ?: string
sEmail ?: string
sLanguage ?: string
sMobileNumber ?: string
sSocialAccounts ?: SocialAccounts

}

