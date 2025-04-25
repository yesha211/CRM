import classNames from 'classnames'
import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import {
    HiUserCircle,
    HiMail,
    HiDocumentText,
    HiCalendar,
    HiOutlineTrendingUp,
    HiOutlineTrendingDown,
} from 'react-icons/hi'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface StatisticProps {
    key: string
    label: string
    value: number
    growShrink?: number
}

const GrowShrink = ({ value }: { value: number | String}) => {
    return (
        <span className="flex items-center rounded-full gap-1">
            <span
                className={classNames(
                    'rounded-full p-1',
                    value > 0 &&
                    'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100',
                    value < 0 &&
                    'text-red-600 bg-red-100 dark:text-red-100 dark:bg-red-500/20',
                )}
            >
                {value > 0 && <HiOutlineTrendingUp />}
                {value < 0 && <HiOutlineTrendingDown />}
            </span>
            <span
                className={classNames(
                    'font-semibold',
                    value > 0 && 'text-emerald-600',
                    value < 0 && 'text-red-600',
                )}
            >
                {value > 0 && <>+ </>}
                {value}
            </span>
        </span>
    )
}


type VariantColor =
    | 'slate'
    | 'gray'
    | 'zinc'
    | 'neutral'
    | 'stone'
    | 'red'
    | 'orange'
    | 'amber'
    | 'yellow'
    | 'lime'
    | 'green'
    | 'emerald'
    | 'teal'
    | 'cyan'
    | 'sky'
    | 'blue'
    | 'indigo'
    | 'violet'
    | 'purple'
    | 'fuchsia'
    | 'pink'
    | 'rose';

const avatarVariants: Record<VariantColor, string> = {
    slate: "bg-slate-100 text-slate-600 dark:bg-slate-500/20 dark:text-slate-100",
    gray: "bg-gray-100 text-gray-600 dark:bg-gray-500/20 dark:text-gray-100",
    zinc: "bg-zinc-100 text-zinc-600 dark:bg-zinc-500/20 dark:text-zinc-100",
    neutral: "bg-neutral-100 text-neutral-600 dark:bg-neutral-500/20 dark:text-neutral-100",
    stone: "bg-stone-100 text-stone-600 dark:bg-stone-500/20 dark:text-stone-100",
    red: "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-100",
    orange: "bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-100",
    amber: "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-100",
    yellow: "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-100",
    lime: "bg-lime-100 text-lime-600 dark:bg-lime-500/20 dark:text-lime-100",
    green: "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-100",
    emerald: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100",
    teal: "bg-teal-100 text-teal-600 dark:bg-teal-500/20 dark:text-teal-100",
    cyan: "bg-cyan-100 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-100",
    sky: "bg-sky-100 text-sky-600 dark:bg-sky-500/20 dark:text-sky-100",
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100",
    indigo: "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-100",
    violet: "bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-100",
    purple: "bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-100",
    fuchsia: "bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-500/20 dark:text-fuchsia-100",
    pink: "bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-100",
    rose: "bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-100"
};

function getAvatarClass(color: VariantColor): string {
    return avatarVariants[color];
}




const StatisticIcon = ({ IconType }: { IconType?: string }) => {
    switch (IconType) {
        case 'info':
            return (
                <Avatar
                    size={55}
                    className="bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-100"
                    icon={<HiUserCircle />}
                />
            )
        case 'emailResponse':
            return (
                <Avatar
                    size={55}
                    className="bg-cyan-100 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-100"
                    icon={<HiMail />}
                />
            )
        case 'proposals':
            return (
                <Avatar
                    size={55}
                    className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100"
                    icon={<HiDocumentText />}
                />
            )
        case 'appointment':
            return (
                <Avatar
                    size={55}
                    className="bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-100"
                    icon={<HiCalendar />}
                />
            )
        default:
            return <div></div>
    }
}

const StatisticCard = ({ data = {} }: { data: Partial<StatisticProps> }) => {
    return (
        <Card className="col-span-1 lg:col-span-2 xl:col-span-2">
            <div className="flex items-center gap-4">
                <StatisticIcon type={data.key} />
                <div>
                    <div className="flex gap-1.5 items-end mb-2">
                        <h3 className="font-bold leading-none">{data.value}</h3>
                        <p className="font-semibold">{data.label}</p>
                    </div>
                    <p className="flex items-center gap-1">
                        <GrowShrink value={data.growShrink || 0} />
                        <span>this month</span>
                    </p>
                </div>
            </div>
        </Card>
    )
}

const Statistic = ({ Icon, IconType, Value, label, UpDown, Text, }: {
    Icon: String,
    IconType: VariantColor,
    Value: string | number,
    label: String,
    UpDown: string | number,
    Text: String
}) => {
    return (
        <>

            <Card className="col-span-1 lg:col-span-2 xl:col-span-2">
                <div className="flex items-center gap-4">
                    <Avatar
                        size={55}
                        className={getAvatarClass(IconType)}
                        icon={Icon}
                    />
                    <div>
                        <div className="flex gap-1.5 items-end mb-2">
                            <h3 className="font-bold leading-none">{Value}</h3>
                            <p className="font-semibold">{label}</p>
                        </div>
                        <p className="flex items-center gap-1">
                            <GrowShrink value={UpDown|| 0} />
                            <span>{Text}</span>
                        </p>
                    </div>
                </div>
            </Card>

        </>
    )
}

export default Statistic
