import {
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_TITLE,
} from '@/constants/navigation.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'

const widgetsNavigationConfig: NavigationTree[] = [
    {
        key: 'widgets',
        path: '/widgets',
        title: 'Widgets',
        translateKey: 'nav.widgets',
        icon: '',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        subMenu: [
            {
                key: 'widgets.cards',
                path: '/widgets/cards',
                title: 'Cards',
                translateKey: 'nav.widgets.cards',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'widgets.timeline',
                path: '/widgets/timeline',
                title: 'Timeline',
                translateKey: 'nav.widgets.timeline',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'widgets.counters',
                path: '/widgets/counters',
                title: 'Counters',
                translateKey: 'nav.widgets.counters',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
        ],
    },
]
export default widgetsNavigationConfig
