import classNames from 'classnames'
import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'

export interface StatisticProps {
    key: string
    label: string
    value: number
    cardVariant?: string | number | symbol // New prop for card background color
}

// Avatar variants with slightly lighter shades compared to card backgrounds
const avatarVariants: Record<string | number | symbol, string> = {
    slate: "bg-slate-100 text-slate-600 dark:bg-slate-500 dark:text-slate-100", // Lighter slate, soft and visible
    red: "bg-red-100 text-red-600 dark:bg-red-500 dark:text-red-100", // Lighter red, subtle and softer
    orange: "bg-orange-100 text-orange-600 dark:bg-orange-500 dark:text-orange-100", // Soft orange, lighter
    yellow: "bg-yellow-100 text-yellow-600 dark:bg-yellow-500 dark:text-yellow-100", // Light yellow
    green: "bg-green-100 text-green-600 dark:bg-green-500 dark:text-green-100", // Lighter green
    emerald: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500 dark:text-emerald-100", // Light emerald
    teal: "bg-teal-100 text-teal-600 dark:bg-teal-500 dark:text-teal-100", // Softer teal
    cyan: "bg-cyan-100 text-cyan-600 dark:bg-cyan-500 dark:text-cyan-100", // Lighter cyan
    sky: "bg-sky-100 text-sky-600 dark:bg-sky-500 dark:text-sky-100", // Soft sky blue
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-500 dark:text-blue-100", // Lighter blue
    indigo: "bg-indigo-100 text-indigo-600 dark:bg-indigo-500 dark:text-indigo-100", // Soft indigo
    violet: "bg-violet-100 text-violet-600 dark:bg-violet-500 dark:text-violet-100", // Lighter violet
    purple: "bg-purple-100 text-purple-600 dark:bg-purple-500 dark:text-purple-100", // Soft purple
    pink: "bg-pink-100 text-pink-600 dark:bg-pink-500 dark:text-pink-100", // Soft pink
    rose: "bg-rose-100 text-rose-600 dark:bg-rose-500 dark:text-rose-100", // Lighter rose
};

// Card background variants with slightly darker shades
const cardVariants: Record<string | number | symbol, string> = {
    slate: "bg-slate-200 dark:bg-slate-600", // Soft slate, calming tone
    red: "bg-red-200 dark:bg-red-600", // Lighter red with soft dark contrast
    orange: "bg-orange-200 dark:bg-orange-600", // Light orange, soft with contrast
    yellow: "bg-yellow-200 dark:bg-yellow-600", // Warm yellow, bright but soft
    green: "bg-green-200 dark:bg-green-600", // Fresh green with subtle contrast
    emerald: "bg-emerald-200 dark:bg-emerald-600", // Soft emerald with dark contrast
    teal: "bg-teal-200 dark:bg-teal-600", // Muted teal, gentle and balanced
    cyan: "bg-cyan-200 dark:bg-cyan-600", // Soft cyan with calming feel
    sky: "bg-sky-200 dark:bg-sky-600", // Light sky blue, clear contrast
    blue: "bg-blue-200 dark:bg-blue-600", // Calming blue, soft and noticeable
    indigo: "bg-indigo-200 dark:bg-indigo-600", // Soft indigo with visible contrast
    violet: "bg-violet-200 dark:bg-violet-600", // Light violet with dark depth
    purple: "bg-purple-200 dark:bg-purple-600", // Soft purple with contrast
    pink: "bg-pink-200 dark:bg-pink-600", // Light pink with a soft feel
    rose: "bg-rose-200 dark:bg-rose-600", // Gentle rose with depth in dark mode
};

// Function to get the avatar class
function getAvatarClass(color: string | number | symbol): string {
    return avatarVariants[color];
}

// Function to get card background class
function getCardClass(color: string | number | symbol): string {
    return cardVariants[color];
}

// Function to get font color for label and value based on card variant
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

const Counter_1 = ({ Icon, CardVariant, Value, label, Text }: {
    Icon: React.ReactElement,
    CardVariant: string | number | symbol,
    Value: string | number,
    label: String,
    Text: String,
}) => {
    return (
        <Card className={getCardClass(CardVariant)}>
            <h6 className={classNames("font-semibold mb-2 text-lg", getLabelColorClass(CardVariant))}>{label}</h6>
            <div className="flex justify-between items-center">
                <div>
                    <h2 className={classNames("font-bold", getLabelColorClass(CardVariant))}>{Value}</h2>
                </div>
                <div>
                    <Avatar
                        size={45}
                        className={getAvatarClass(CardVariant)}
                        icon={Icon}
                    />
                </div>
            </div>
            <div>
                <p className={classNames("text-sm", getLabelColorClass(CardVariant))}>{Text}</p>
            </div>
        </Card>
    )
}

export default Counter_1
