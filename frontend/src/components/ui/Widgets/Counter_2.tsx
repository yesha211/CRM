import classNames from 'classnames'
import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'

// Avatar variants with slightly lighter shades compared to card backgrounds
const avatarVariants: Record<string | number | symbol, string> = {
    slate: "bg-slate-100 text-slate-600 dark:bg-slate-500 dark:text-slate-100",
    red: "bg-red-100 text-red-600 dark:bg-red-500 dark:text-red-100",
    orange: "bg-orange-100 text-orange-600 dark:bg-orange-500 dark:text-orange-100",
    yellow: "bg-yellow-100 text-yellow-600 dark:bg-yellow-500 dark:text-yellow-100",
    green: "bg-green-100 text-green-600 dark:bg-green-500 dark:text-green-100",
    emerald: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500 dark:text-emerald-100",
    teal: "bg-teal-100 text-teal-600 dark:bg-teal-500 dark:text-teal-100",
    cyan: "bg-cyan-100 text-cyan-600 dark:bg-cyan-500 dark:text-cyan-100",
    sky: "bg-sky-100 text-sky-600 dark:bg-sky-500 dark:text-sky-100",
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-500 dark:text-blue-100",
    indigo: "bg-indigo-100 text-indigo-600 dark:bg-indigo-500 dark:text-indigo-100",
    violet: "bg-violet-100 text-violet-600 dark:bg-violet-500 dark:text-violet-100",
    purple: "bg-purple-100 text-purple-600 dark:bg-purple-500 dark:text-purple-100",
    pink: "bg-pink-100 text-pink-600 dark:bg-pink-500 dark:text-pink-100",
    rose: "bg-rose-100 text-rose-600 dark:bg-rose-500 dark:text-rose-100",
};

// Card background variants with slightly darker shades
const cardVariants: Record<string | number | symbol, string> = {
    slate: "bg-slate-200 dark:bg-slate-600",
    red: "bg-red-200 dark:bg-red-600",
    orange: "bg-orange-200 dark:bg-orange-600",
    yellow: "bg-yellow-200 dark:bg-yellow-600",
    green: "bg-green-200 dark:bg-green-600",
    emerald: "bg-emerald-200 dark:bg-emerald-600",
    teal: "bg-teal-200 dark:bg-teal-600",
    cyan: "bg-cyan-200 dark:bg-cyan-600",
    sky: "bg-sky-200 dark:bg-sky-600",
    blue: "bg-blue-200 dark:bg-blue-600",
    indigo: "bg-indigo-200 dark:bg-indigo-600",
    violet: "bg-violet-200 dark:bg-violet-600",
    purple: "bg-purple-200 dark:bg-purple-600",
    pink: "bg-pink-200 dark:bg-pink-600",
    rose: "bg-rose-200 dark:bg-rose-600",
};

function getLabelColorClass(color: string | number | symbol): string {
    return classNames(
        color === 'slate' && 'text-slate-600  dark:text-slate-100',
        color === 'red' && 'text-red-600  dark:text-red-100',
        color === 'orange' && 'text-orange-600  dark:text-orange-100',
        color === 'yellow' && 'text-yellow-600  dark:text-yellow-100',
        color === 'green' && 'text-green-600  dark:text-green-100',
        color === 'emerald' && 'text-emerald-600  dark:text-emerald-100',
        color === 'teal' && 'text-teal-600  dark:text-teal-100',
        color === 'cyan' && 'text-cyan-600  dark:text-cyan-100',
        color === 'sky' && 'text-sky-600  dark:text-sky-100',
        color === 'blue' && 'text-blue-600  dark:text-blue-100',
        color === 'indigo' && 'text-indigo-600  dark:text-indigo-100',
        color === 'violet' && 'text-violet-600  dark:text-violet-100',
        color === 'purple' && 'text-purple-600  dark:text-purple-100',
        color === 'pink' && 'text-pink-600  dark:text-pink-100',
        color === 'rose' && 'text-rose-600  dark:text-rose-100'
    );
}


function getAvatarClass(color: string | number | symbol): string {
    return avatarVariants[color];
}

// Function to get card background class
function getCardClass(color: string | number | symbol): string {
    return cardVariants[color];
}

const Counter_2 = ({ Icon, Value, label, CardVariant }: {
    Icon: React.ReactElement,
    Value: string | number,
    label: string
    CardVariant: string | number | symbol // New prop for card background color
}) => {
    return (
        <Card className={classNames(getCardClass(CardVariant), "col-span-1 lg:col-span-2 xl:col-span-1")}>
            <div className="flex  gap-4">
                <Avatar
                    size={55}
                    className={getAvatarClass(CardVariant)}
                    icon={Icon}
                />
                <div className="flex flex-col ml-4 flex-grow">
                    <div className="flex gap-2 items-end  justify-end">
                        <h3 className={classNames("font-bold",getLabelColorClass(CardVariant))}>{Value}</h3>
                    </div>
                    <p className={classNames(getLabelColorClass(CardVariant), "text-right font-bold text-lg")}>{label}</p>
                </div>
            </div>
        </Card>

    );
}

export default Counter_2;
