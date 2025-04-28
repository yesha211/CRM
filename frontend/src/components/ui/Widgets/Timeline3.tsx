import { Timeline } from '@/components/ui/Timeline'
import { ReactNode } from 'react'

export interface TimelineItem {
    icon: ReactNode
    color: string
    title: string
    description: string
}

export interface Timeline3Props {
    items: TimelineItem[]
}

export function Timeline3({ items }: Timeline3Props) {
    return (
        <div className="w-[32rem]">
            <Timeline>
                {items.map((item, index) => (
                    <Timeline.Item
                        key={index}
                        media={
                            <div className={`p-2 ${item.color} rounded-full`}>
                                {item.icon}
                            </div>
                        }
                    >
                        <div className="h-3 flex items-center gap-2">
                            <span className="text-lg font-semibold text-gray-800">
                                {item.title}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                            {item.description}
                        </p>
                    </Timeline.Item>
                ))}
            </Timeline>
        </div>
    )
}
