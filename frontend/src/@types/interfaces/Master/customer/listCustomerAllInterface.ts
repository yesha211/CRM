import {
address,
SocialAccounts}
from "@/@types/interfaces/JSON_ObjectInterface"

export interface listCustomerAll_Res {
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

