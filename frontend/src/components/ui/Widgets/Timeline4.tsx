import { Timeline } from '@/components/ui/Timeline'
import { ReactNode } from 'react'

export interface TimelineItem {
    icon: ReactNode
    color: string
    title: string
    description: string
}

export interface Timeline4Props {
    items: TimelineItem[]
}

export function Timeline4({ items }: Timeline4Props) {
    return (
        <div className="w-[25rem]">
            <Timeline>
                {items.map((item, index) => (
                    <Timeline.Item
                        key={index}
                        media={
                            <div
                                className={`flex items-center justify-center w-10 h-10 ${item.color} text-white rounded-full`}
                            >
                                {item.icon}
                            </div>
                        }
                    >
                        <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-lg">
                            <p className="text-base font-semibold text-gray-800">
                                {item.title}
                            </p>
                            <p className="text-sm text-gray-600">
                                {item.description}
                            </p>
                        </div>
                    </Timeline.Item>
                ))}
            </Timeline>
        </div>
    )
}
