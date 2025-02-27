import Card from '@/components/ui/Card'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'

const Card3 = () => {
    const cardHeader = (
        <div className="h-80 w-full overflow-hidden rounded-t-lg">
            <img
                src="https://docs.material-tailwind.com/img/team-3.jpg"
                alt="profile-picture"
                className="w-full h-full object-cover"
            />
        </div>
    )

    const cardFooter = (
        <div className="flex justify-center gap-7 pt-2">
            <a href="#facebook" className="text-blue-600 text-xl">
                <FaFacebook />
            </a>
            <a href="#twitter" className="text-sky-400 text-xl">
                <FaTwitter />
            </a>
            <a href="#instagram" className="text-purple-500 text-xl">
                <FaInstagram />
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
                    Natalie Paisley
                </h4>
                <p className="text-blue-gray-500 font-medium">
                    CEO / Co-Founder
                </p>
            </Card>
        </div>
    )
}

export default Card3
