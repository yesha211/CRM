import Logo from '@/components/template/Logo'
import { useAppSelector } from '@/store'

const HeaderLogo = () => {
    const mode = useAppSelector((state) => state.theme.mode)

    return <Logo mode={mode} className="hidden md:block" logoWidth="250px"/>
}

export default HeaderLogo
