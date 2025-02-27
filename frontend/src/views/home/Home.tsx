import { Button } from '@/components/ui'
import { BookingCard } from '@/components/widgets/BookingCard'
import Card1 from '@/components/widgets/Card1'
import Card2 from '@/components/widgets/Card2'
import Card3 from '@/components/widgets/Card3'
import Collapse from '@/components/widgets/Collapse'
import { PricingCard } from '@/components/widgets/PricingCard'
import Statistic from '@/components/widgets/Statistic'
import TimeLineWidget from '@/components/widgets/TimeLineWidget'
import React from 'react'

const Home = () => {
    const [open, setOpen] = React.useState(false)

    const data = [
        { key: 'newLeads', label: 'New Leads', value: 63, growShrink: 2.6 },
        { key: 'emailResponse', label: 'Email', value: 25, growShrink: 5.5 },
        { key: 'proposals', label: 'Proposals', value: 49, growShrink: -0.7 },
        {
            key: 'appointment',
            label: 'Appointment',
            value: 12,
            growShrink: 2.6,
        },
        {
            key: 'revenue',
            label: 'Revenue',
            value: 1,
            growShrink: -0.7,
        },
    ]

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                {/* <div className="col-span-1 lg:col-span-2 xl:col-span-1"> */}
                <Statistic data={data} />
                {/* </div> */}
            </div>
            <div className="w-full mt-4 flex justify-center border-t border-gray-200 pt-4 gap-4">
                <TimeLineWidget />
            </div>
            <div className="w-full mt-4 flex justify-center border-t border-gray-200 pt-4 gap-4">
                <Card1 />
                <Card2 />
                <Card3 />
            </div>
            <div className="w-full mt-4 flex flex-col items-center border-t border-gray-200 pt-4 gap-4">
                <Button onClick={() => setOpen((prev) => !prev)}>
                    Toggle Collapse
                </Button>
                <div className="w-full">
                    <Collapse open={open}>
                        <div className="w-full flex justify-center pt-4 gap-4">
                            <PricingCard />
                            <BookingCard />
                        </div>
                    </Collapse>
                </div>
            </div>
        </>
    )
}

export default Home
