import { Timeline2 } from '@/components/widgets/Timeline2'
import { Timeline3 } from '@/components/widgets/Timeline3'
import { Timeline4 } from '@/components/widgets/Timeline4'
import { FaHome, FaBell, FaDollarSign, FaArchive } from 'react-icons/fa'

const Timeline = () => {
    const timelineItems2 = [
        {
            title: 'Timeline Title 1',
            description:
                'The key to more success is to have a lot of pillows. Put it this way, it took me twenty five years to get these plants, twenty five years of blood, sweat, and tears',
            color: 'bg-blue-500',
        },
        {
            title: 'Timeline Title 2',
            description:
                'The key to more success is to have a lot of pillows. Put it this way, it took me twenty five years to get these plants, twenty five years of blood, sweat, and tears',
            color: 'bg-green-500',
        },
    ]

    const timelineItems3 = [
        {
            icon: <FaHome className="h-4 w-4 text-white" />,
            color: 'bg-blue-500',
            title: 'Timeline Title Here.',
            description:
                "The key to more success is to have a lot of pillows. Put it this way, it took me twenty five years to get these plants, twenty five years of blood, sweat, and tears, and I'm never giving up, I'm just getting started. I'm up to something. Fan luv.",
        },
        {
            icon: <FaBell className="h-4 w-4 text-white" />,
            color: 'bg-green-500',
            title: 'Timeline Title Here.',
            description:
                "The key to more success is to have a lot of pillows. Put it this way, it took me twenty five years to get these plants, twenty five years of blood, sweat, and tears, and I'm never giving up, I'm just getting started. I'm up to something. Fan luv.",
        },
        {
            icon: <FaDollarSign className="h-4 w-4 text-white" />,
            color: 'bg-red-500',
            title: 'Timeline Title Here.',
            description:
                "The key to more success is to have a lot of pillows. Put it this way, it took me twenty five years to get these plants, twenty five years of blood, sweat, and tears, and I'm never giving up, I'm just getting started. I'm up to something. Fan luv.",
        },
    ]

    const timelineItems4 = [
        {
            icon: <FaBell className="h-5 w-5" />,
            color: 'bg-blue-500',
            title: '$2400, Design changes',
            description: '22 DEC 7:20 PM',
        },
        {
            icon: <FaArchive className="h-5 w-5" />,
            color: 'bg-red-500',
            title: 'New order #1832412',
            description: '21 DEC 11 PM',
        },
        {
            icon: <FaDollarSign className="h-5 w-5" />,
            color: 'bg-green-500',
            title: 'Payment completed for order #4395133',
            description: '20 DEC 2:20 AM',
        },
    ]

    return (
        <div className="flex gap-4 flex-wrap">
            <div>
                <Timeline2 items={timelineItems2} />
            </div>
            <div>
                <Timeline3 items={timelineItems3} />
            </div>
            <div>
                <Timeline4 items={timelineItems4} />
            </div>
        </div>
    )
}

export default Timeline
