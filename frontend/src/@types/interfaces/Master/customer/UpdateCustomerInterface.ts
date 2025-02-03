import {
address,
SocialAccounts}
from "@/@types/interfaces/JSON_ObjectInterface"

export interface UpdateCustomer_Req {
bInActive ?: boolean
sAddress ?: address
sCustomerName ?: string
sEmail ?: string
sLanguage ?: string
sMobileNumber ?: string
sSocialAccounts ?: SocialAccounts
sCustomerGUID ?: string
}

export interface UpdateCustomer_Res {
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

