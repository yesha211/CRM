import Card from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Tooltip } from '@/components/ui/Tooltip'
import {
    FaHeart,
    FaStar,
    FaWifi,
    FaTv,
    FaBed,
    FaDollarSign,
    FaXRay,
    FaCar,
} from 'react-icons/fa'

export function BookingCard() {
    return (
        <Card className="w-full max-w-[26rem] shadow-lg rounded-xl overflow-hidden">
            <div className="relative h-52">
                <img
                    src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    alt="Wooden House"
                    className="h-full w-full object-cover rounded-md shadow-md"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-black/60" />

                <FaHeart className="size-6 absolute top-4 right-4 text-red-500 " />
            </div>
            <div className="card-body">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Wooden House, Florida
                    </h3>
                    <div className="flex items-center gap-1">
                        <span className="flex items-center text-yellow-500">
                            <FaStar className="w-5 h-5" />
                        </span>
                        <span className="text-sm">5.0</span>
                    </div>
                </div>
                <p className="text-gray-600 text-sm">
                    Enter a freshly updated and thoughtfully furnished peaceful
                    home surrounded by ancient trees, stone walls, and open
                    meadows.
                </p>
                <div className="flex items-center gap-3 mt-5 py-3 ">
                    <Tooltip title="$129 per night">
                        <span className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
                            <FaDollarSign className="w-5 h-5 text-gray-700" />
                        </span>
                    </Tooltip>
                    <Tooltip title="Free wifi">
                        <span className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
                            <FaWifi className="w-5 h-5 text-gray-700" />
                        </span>
                    </Tooltip>
                    <Tooltip title="2 bedrooms">
                        <span className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
                            <FaBed className="w-5 h-5 text-gray-700" />
                        </span>
                    </Tooltip>
                    <Tooltip title='65" HDTV'>
                        <span className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
                            <FaTv className="w-5 h-5 text-gray-700" />
                        </span>
                    </Tooltip>
                    <Tooltip title="Free cancellation">
                        <span className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
                            <FaXRay className="w-5 h-5 text-gray-700" />
                        </span>
                    </Tooltip>
                    <Tooltip title="Free parking">
                        <span className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
                            <FaCar className="w-5 h-5 text-gray-700" />
                        </span>
                    </Tooltip>
                    <Tooltip title="20 others">
                        <span className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
                            <FaStar className="w-5 h-5 text-gray-700" />
                        </span>
                    </Tooltip>
                </div>
            </div>
            <div className="card-footer pt-4 border-t">
                <Button
                    variant="solid"
                    className="w-full bg-primary text-white"
                >
                    Book Now
                </Button>
            </div>
        </Card>
    )
}
