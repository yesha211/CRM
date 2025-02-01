export interface Geolocation {
    sLat?: string
    sLang?: string
}

export interface Address {
    city?: string
    state?: string
    geolocation?: Geolocation
}

export interface SocialAccounts {
    Linkdein?: string
    Facebook?: string
    nTwitter?: number
    bYoutube?: boolean
    dX?: Date
}

export interface Customer {
    sCustomerGUID?: string
    sCustomerName?: string
    sEmail?: string
    sLanguage?: string[]
    sMobileNumber?: string
    sAddress?: Address
    sSocialAccounts?: SocialAccounts
    bInActive?: boolean
}

export interface CustomerTypeRes {
    Message: string
    data: Customer
}
