import Card from '@/components/ui/Card'

export interface Card3Props {
    image: string
    heading: string
    subHeading: string
    icon1: React.ReactNode
    icon2: React.ReactNode
    icon3: React.ReactNode
}

const Card3 = ({
    image,
    heading,
    subHeading,
    icon1,
    icon2,
    icon3,
}: Card3Props) => {
    const cardHeader = (
        <div className="h-80 w-full overflow-hidden rounded-t-lg">
            <img
                src={image}
                alt="profile-picture"
                className="w-full h-full object-cover"
            />
        </div>
    )

    const cardFooter = (
        <div className="flex justify-center gap-7 pt-2">
            <a href="#icon1" className="text-blue-600 text-xl">
                {icon1}
            </a>
            <a href="#icon2" className="text-sky-400 text-xl">
                {icon2}
            </a>
            <a href="#icon3" className="text-purple-500 text-xl">
                {icon3}
            </a>
        </div>
    )

    return (
        <div>
            <Card
                className="text-center"
                header={cardHeader}
                footer={cardFooter}
                headerBorder={false}
                footerBorder={false}
            >
                <h4 className="text-2xl font-bold text-blue-gray-700 mb-2">
                    {heading}
                </h4>
                <p className="text-blue-gray-500 font-medium">{subHeading}</p>
            </Card>
        </div>
    )
}

export default Card3
