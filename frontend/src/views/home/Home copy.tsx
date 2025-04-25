import Statistic from '@/components/widgets/Statistic'
import TimeLineWidget from '@/components/widgets/TimeLineWidget'
import React from 'react'
import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import classNames from 'classnames'

import {
    HiUserCircle,
    HiMail,
    HiDocumentText,
    HiCalendar,
    HiOutlineTrendingUp,
    HiOutlineTrendingDown,
} from 'react-icons/hi'

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

    const GrowShrink = ({ value }: { value: number }) => {
        return (
            <span className="flex items-center rounded-full gap-1">
                <span
                    className={classNames(
                        'rounded-full p-1',
                        value > 0 &&
                            'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100',
                        value < 0 &&
                            'text-red-600 bg-red-100 dark:text-red-100 dark:bg-red-500/20',
                    )}
                >
                    {value > 0 && <HiOutlineTrendingUp />}
                    {value < 0 && <HiOutlineTrendingDown />}
                </span>
                <span
                    className={classNames(
                        'font-semibold',
                        value > 0 && 'text-emerald-600',
                        value < 0 && 'text-red-600',
                    )}
                >
                    {value > 0 && <>+ </>}
                    {value}
                </span>
            </span>
        )
    }
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                {/* <div className="col-span-1 lg:col-span-2 xl:col-span-1"> */}
                {/* just for testing purpose */}
                {data.map((card) => (
                <Card className="col-span-1 lg:col-span-2 xl:col-span-2">
                <div className="flex items-center gap-4">
                <Avatar
                    size={55}
                    className="bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-100"
                    icon={<HiUserCircle />}
                />
                    <div>
                        <div className="flex gap-1.5 items-end mb-2">
                            <h3 className="font-bold leading-none">{data.value}</h3>
                            <p className="font-semibold">{data.label}</p>
                        </div>
                        <p className="flex items-center gap-1">
                            <GrowShrink value={data.growShrink || 0} />
                            <span>this month</span>
                        </p>
                    </div>
                </div>
            </Card>
            ))}
                {/* </div> */}
            </div>
            <div className="w-full mt-4 flex justify-center border-t border-gray-200 pt-4 gap-4">
                <TimeLineWidget />
            </div>
        </>
    )
}

export default Home
