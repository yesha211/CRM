import type { NavigationTree } from '@/@types/navigation'
import testingNavigationConfig from './testing.navigation.config'
import widgetsNavigationConfig from './widgets.navigation.config'

const navigationConfig: NavigationTree[] = [
    ...testingNavigationConfig,
    ...widgetsNavigationConfig,
]
export default navigationConfig
