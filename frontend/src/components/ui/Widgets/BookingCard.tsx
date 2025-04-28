import Card from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Tooltip } from '@/components/ui/Tooltip'
import { FaHeart, FaStar } from 'react-icons/fa'

export interface BookingCardProps {
    image: string
    title: string
    rating: number
    description: string
    price: string
    amenities: { icon: React.ReactNode; tooltip: string }[]
    buttonText: string
}

export function BookingCard({
    image,
    title,
    rating,
    description,
    amenities,
    buttonText,
}: BookingCardProps) {
    return (
        <Card className="w-full max-w-[26rem] shadow-lg rounded-xl overflow-hidden">
            <div className="relative h-52">
                <img
                    src={image}
                    alt="Wooden House"
                    className="h-full w-full object-cover rounded-md shadow-md"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-black/60" />
                <FaHeart className="size-6 absolute top-4 right-4 text-red-500 " />
            </div>
            <div className="card-body">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {title}
                    </h3>
                    <div className="flex items-center gap-1">
                        <span className="flex items-center text-yellow-500">
                            <FaStar className="w-5 h-5" />
                        </span>
                        <span className="text-sm">{rating}</span>
                    </div>
                </div>
                <p className="text-gray-600 text-sm">{description}</p>
                <div className="flex items-center gap-3 mt-5 py-3 ">
                    {amenities.map((amenity, index) => (
                        <Tooltip key={index} title={amenity.tooltip}>
                            <span className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
                                {amenity.icon}
                            </span>
                        </Tooltip>
                    ))}
                </div>
            </div>
            <div className="card-footer pt-4 border-t">
                <Button
                    variant="solid"
                    className="w-full bg-primary text-white"
                >
                    {buttonText}
                </Button>
            </div>
        </Card>
    )
}
