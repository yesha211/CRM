import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'

export interface Card1Props {
    image: string
    heading: string
    subHeading: string
    description: string
    avatar: string
    avatarName: string
    avatarDate: string
}

const Card1 = ({
    image,
    heading,
    subHeading,
    description,
    avatar,
    avatarDate,
    avatarName,
}: Card1Props) => {
    const cardFooter = (
        <div className="flex items-center">
            <Avatar size={30} className="mr-2" shape="circle" src={avatar} />
            <span>
                <h6 className="text-sm">{avatarName}</h6>
                <span className="text-xs">{avatarDate}</span>
            </span>
        </div>
    )

    const cardHeader = (
        <div className="rounded-tl-lg rounded-tr-lg overflow-hidden">
            <img src={image} alt="card header" />
        </div>
    )

    return (
        <div className="max-w-xs">
            <Card
                clickable
                className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                header={cardHeader}
                footer={cardFooter}
                headerClass="p-0"
                footerBorder={false}
                headerBorder={false}
            >
                <span className="text-emerald-600 font-semibold">
                    {subHeading}
                </span>
                <h4 className="font-bold my-3">{heading}</h4>
                <p>{description}</p>
            </Card>
        </div>
    )
}

export default Card1
