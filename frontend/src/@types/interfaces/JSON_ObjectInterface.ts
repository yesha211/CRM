export interface address {
    city?: string
    state?: string
    geo_Location?: geoLocation
}
export interface geoLocation {
    sLat?: string
    sLang?: string
}
export interface SocialAccounts {
    LinkedIn?: string
    FaceBook?: string
    nTwitter?: number
    bYoutube?: boolean
    dX?: Date
}
export interface template_obj {
    sTemplateGUID?: string
}
