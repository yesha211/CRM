import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { BsCheck } from 'react-icons/bs'

export interface PricingCardProps {
    buttonTitle: string
    heading: string
    subHeading: string
    value: string
    symbol?: string
    items: string[]
    icon?: JSX.Element
}

export function PricingCard({
    buttonTitle,
    heading,
    subHeading,
    value,
    symbol,
    items = [],
    icon = <BsCheck />,
}: PricingCardProps) {
    return (
        <Card
            className="w-full max-w-[20rem] p-8 bg-gradient-to-l from-gray-700 via-gray-800 to-gray-900 text-white"
            header={
                <div className="text-center pb-6 border-b border-white/10">
                    <h4 className="text-sm text-gray-50 uppercase">
                        {heading}
                    </h4>
                    <div className="mt-4 flex justify-center gap-1 text-5xl font-normal">
                        <span className="mt-2 text-2xl">{symbol}</span>
                        {value}
                        <span className="self-end text-2xl">{subHeading}</span>
                    </div>
                </div>
            }
            footer={
                <Button
                    className="w-full hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                    variant="solid"
                    size="lg"
                >
                    {buttonTitle}
                </Button>
            }
            footerBorder={false}
            headerBorder={false}
        >
            <ul className="flex flex-col gap-4">
                {items.map((item: string, index: number) => (
                    <li key={index} className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                            {icon}
                        </span>
                        <span className="font-normal">{item}</span>
                    </li>
                ))}
            </ul>
        </Card>
    )
}
