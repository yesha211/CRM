import Counter_1 from '@/components/ui/Widgets/Counter_1'
import TimeLineWidget from '@/components/widgets/TimeLineWidget'
import Counter_2 from '@/components/ui/Widgets/Counter_2'
import {
    HiUserCircle,
    HiMail,
    HiDocumentText,
    HiCalendar
} from 'react-icons/hi'
import { Card } from '@/components/ui'



const Home = () => {
    const data: { 
        key: string; 
        label: string; 
        value: number; 
        icon: React.ElementType; 
        cardVariant: string | number | symbol; 
        Text: string; 
    }[] = [
        { 
            key: 'newLeads', 
            label: 'New Leads - Blue', 
            value: 63, 
            icon: HiUserCircle, 
            cardVariant: 'blue', 
            Text: 'Gentle blue.'
        },
        { 
            key: 'emailResponse', 
            label: 'Email - Green', 
            value: 25,
            icon: HiMail, 
            cardVariant: 'green', 
            Text: 'Soft green.'
        },
        { 
            key: 'proposals', 
            label: 'Proposals - Yellow', 
            value: 49, 
            icon: HiDocumentText, 
            cardVariant: 'yellow', 
            Text: 'Subtle yellow'
        },
        { 
            key: 'appointment', 
            label: 'Appointment - Teal', 
            value: 12, 
            icon: HiCalendar, 
            cardVariant: 'teal', 
            Text: 'Calm teal.'
        },
        { 
            key: 'revenue', 
            label: 'Revenue - Red', 
            value: 1, 
            icon: HiCalendar, 
            cardVariant: 'red', 
            Text: 'Rich red.'
        },
        { 
            key: 'newProjects', 
            label: 'New Projects - Violet', 
            value: 53, 
            icon: HiUserCircle, 
            cardVariant: 'violet', 
            Text: 'Deep violet.'
        },
       
        { 
            key: 'salesGrowth', 
            label: 'Sales Growth - Slate', 
            value: 72, 
            icon: HiCalendar, 
            cardVariant: 'slate', 
            Text: 'Smooth slate.'
        },
        { 
            key: 'contractsSigned', 
            label: 'Contracts Signed - Orange', 
            value: 37, 
            icon: HiUserCircle, 
            cardVariant: 'orange', 
            Text: 'Vibrant orange.'
        },
        { 
            key: 'productLaunch', 
            label: 'Product Launch - Pink', 
            value: 94, 
            icon: HiMail, 
            cardVariant: 'pink', 
            Text: 'Gentle pink.'
        },
        
        { 
            key: 'marketResearch', 
            label: 'Market Research - Indigo', 
            value: 18, 
            icon: HiCalendar, 
            cardVariant: 'indigo', 
            Text: 'Rich indigo.'
        },
        { 
            key: 'networkingEvents', 
            label: 'Networking Events - Sky', 
            value: 60, 
            icon: HiUserCircle, 
            cardVariant: 'sky', 
            Text: 'Bright sky.'
        },
        { 
            key: 'quarterlyReview', 
            label: 'Quarterly Review - Cyan', 
            value: 33, 
            icon: HiMail, 
            cardVariant: 'cyan', 
            Text: 'Vibrant cyan.'
        },
        { 
            key: 'teamBuilding', 
            label: 'Team Building - Purple', 
            value: 75, 
            icon: HiDocumentText, 
            cardVariant: 'purple', 
            Text: 'Majestic purple.'
        },
     
        { 
            key: 'vendorNegotiations', 
            label: 'Vendor Negotiations - Rose', 
            value: 29, 
            icon: HiUserCircle, 
            cardVariant: 'rose', 
            Text: 'Gentle rose.'
        },
        { 
            key: 'brandAwareness', 
            label: 'Brand Awareness - Emerald', 
            value: 82,
            icon: HiMail, 
            cardVariant: 'emerald', 
            Text: 'Rich emerald.'
        }
    ];
    
    
    
    
    
    return (
        <>
        <Card>
            <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                {data.map((card) => (
                    <Counter_1
                        Icon={<card.icon />}
                        CardVariant={card.cardVariant}
                        Value={card.value}
                        label={card.label}
                        Text={card.Text}

                    />
                ))}
                {/* </div> */}
            </div>
            <div className="grid mt-4 grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {data.map((card) => (
                    <Counter_2
                        Icon={<card.icon />}
                        CardVariant={card.cardVariant}
                        Value={card.value}
                        label={card.Text}
                    />
                ))}
                {/* </div> */}
            </div>
            <div className="w-full mt-4 flex justify-center border-t border-gray-200 pt-4 gap-4">
                <TimeLineWidget />
            </div>

            </Card>
           
        </>
    )
}

export default Home
