import Card from '@/components/ui/Card'
import { Button } from '../ui'

export interface Card2Props {
    image: string
    title: string
    description: string
    buttonText: string
    buttonColor?: string
}

const Card2 = ({
    image,
    title,
    description,
    buttonText,
    buttonColor = '',
}: Card2Props) => {
    const cardHeader = (
        <div className="relative h-56 rounded-t-lg overflow-hidden">
            <img
                className="w-full h-full object-cover"
                src={image}
                alt="card-image"
            />
        </div>
    )

    const cardFooter = (
        <div className="pt-2">
            <Button size="sm" variant="solid" color={buttonColor}>
                {buttonText}
            </Button>
        </div>
    )

    return (
        <div className="max-w-xs">
            <Card
                className="shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                header={cardHeader}
                footer={cardFooter}
                headerClass="p-0"
                footerBorder={false}
                headerBorder={false}
            >
                <h4 className="text-lg font-bold mb-2 text-blue-gray-700">
                    {title}
                </h4>
                <p className="text-gray-600">{description}</p>
            </Card>
        </div>
    )
}

export default Card2
