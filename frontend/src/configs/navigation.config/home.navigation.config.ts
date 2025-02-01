
import {
    // NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_TITLE,
} from '@/constants/navigation.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'

const homeNavigationConfig: NavigationTree[] = [
    {
        key: 'home.index',
        path: '/home',
        title: 'Home',
        translateKey: 'nav.home',
        icon: '',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        subMenu: [],
    }, ]

export default homeNavigationConfig