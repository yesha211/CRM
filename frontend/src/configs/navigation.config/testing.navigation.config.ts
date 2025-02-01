import {
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_TITLE,
} from '@/constants/navigation.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'

const testingNavigationConfig: NavigationTree[] = [
    {
        key: 'testing',
        path: '/testing',
        title: 'Testing',
        translateKey: 'nav.testing',
        icon: '',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        subMenu: [
            {
                key: 'testing.customer',
                path: '/testing/customer',
                title: 'Customer',
                translateKey: 'nav.testing.customer',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
        ],
    },
]
export default testingNavigationConfig
