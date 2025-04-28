import { Timeline } from '@/components/ui/Timeline'

interface TimelineItem {
    title: string
    description: string
    color: string
}

interface Timeline2Props {
    items: TimelineItem[]
}

export function Timeline2({ items }: Timeline2Props) {
    return (
        <div className="w-[32rem]">
            <Timeline>
                {items.map((item, index) => (
                    <Timeline.Item
                        key={index}
                        media={
                            <div
                                className={`w-6 h-6 ${item.color} rounded-full`}
                            />
                        }
                    >
                        <div className="h-3 mb-5">
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
