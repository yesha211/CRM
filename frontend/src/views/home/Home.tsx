import Statistic from '@/components/widgets/Statistic'
import TimeLineWidget from '@/components/widgets/TimeLineWidget'
import React from 'react'

const Home = () => {
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
            <div className="w-full mt-4 flex justify-center">
                <TimeLineWidget />
            </div>
        </>
    )
}

export default Home
