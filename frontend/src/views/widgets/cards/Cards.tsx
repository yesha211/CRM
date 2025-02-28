import Card1 from '@/components/widgets/Card1'
import Card2 from '@/components/widgets/Card2'
import Card3 from '@/components/widgets/Card3'
import { BookingCard } from '@/components/widgets/BookingCard'
import { PricingCard } from '@/components/widgets/PricingCard'
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaWifi,
    FaTv,
    FaBed,
    FaDollarSign,
    FaXRay,
    FaCar,
} from 'react-icons/fa'
import reducer, {
    listTemplatesALL,
    useAppDispatch,
    useAppSelector,
} from '@/store/Master/template'
import { useEffect } from 'react'
import { injectReducer } from '@/store'
import { listTemplatesALL_Res } from '@/@types/interfaces/Master/MAction_Template/listTemplatesALLInterface'

injectReducer('MAction_Template', reducer)

type TemplateType = Required<listTemplatesALL_Res>['data']

const Cards = () => {
    const templateData = useAppSelector(
        (state) =>
            state.MAction_Template?.data?.listTemplatesALL_State?.data ?? [],
    ) as TemplateType[]

    console.log('Template Data:', templateData)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(listTemplatesALL())
    }, [dispatch])
    return (
        <div>
            <div className="w-full mt-4 flex justify-center border-t border-gray-200 pt-4 gap-4">
                <Card1
                    heading="Sample Heading"
                    subHeading="Sample Subheading"
                    description="This is some sample content for the card."
                    avatar="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    avatarName="John Doe"
                    avatarDate="2 days ago"
                    image="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                />
                <Card2
                    image="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    title="UI/UX Review Check"
                    description="The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to 'Naviglio' where you can enjoy the main nightlife in Barcelona."
                    buttonText="Read More"
                    buttonColor="blue"
                />
                <Card3
                    image="https://docs.material-tailwind.com/img/team-3.jpg"
                    heading="Natalie Paisley"
                    subHeading="CEO / Co-Founder"
                    icon1={<FaFacebook />}
                    icon2={<FaTwitter />}
                    icon3={<FaInstagram />}
                />
            </div>
            <div className="w-full mt-4 flex justify-center border-t border-gray-200 pt-4 gap-4">
                <BookingCard
                    image="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    title="Wooden House, Florida"
                    rating={5.0}
                    description="Enter a freshly updated and thoughtfully furnished peaceful home surrounded by ancient trees, stone walls, and open meadows."
                    price="$129 per night"
                    amenities={[
                        {
                            icon: <FaDollarSign size={20} />,
                            tooltip: '$129 per night',
                        },
                        { icon: <FaWifi size={20} />, tooltip: 'Free wifi' },
                        { icon: <FaBed size={20} />, tooltip: '2 bedrooms' },
                        { icon: <FaTv size={20} />, tooltip: '65" HDTV' },
                        {
                            icon: <FaXRay size={20} />,
                            tooltip: 'Free cancellation',
                        },
                        { icon: <FaCar size={20} />, tooltip: 'Free parking' },
                        { icon: <FaWifi size={20} />, tooltip: 'Free wifi' },
                    ]}
                    buttonText="Book Now"
                />
                <PricingCard
                    buttonTitle="Get Started"
                    heading="Basic Plan"
                    subHeading="/month"
                    value="19"
                    symbol="$"
                    items={[
                        '10 Projects',
                        '5 Team Members',
                        '20 GB Storage',
                        '24/7 Support',
                        'Free Setup',
                        'Unlimited Data',
                    ]}
                />
            </div>
            <div className="w-full mt-4 grid grid-cols-4 border-t border-gray-200 pt-4 gap-4">
                {templateData.map((template) => (
                    <Card2
                        key={template.sTemplateGUID}
                        title={template.sTemplate_ID ?? ''}
                        description={template.sMessage_to_send ?? ''}
                        buttonText={template.sTemplate_Send_via ?? ''}
                    />
                ))}
            </div>
        </div>
    )
}

export default Cards
