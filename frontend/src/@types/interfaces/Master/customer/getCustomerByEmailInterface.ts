import {
address,
SocialAccounts}
from "@/@types/interfaces/JSON_ObjectInterface"

export interface getCustomerByEmail_Req {
sEmail ?: string
}

export interface getCustomerByEmail_Res {
data ?: data_type
}

interface data_type{
bInActive ?: boolean
sAddress ?: address
sCustomerGUID ?: string
sCustomerName ?: string
sEmail ?: string
sLanguage ?: string
sMobileNumber ?: string
sSocialAccounts ?: SocialAccounts

}

