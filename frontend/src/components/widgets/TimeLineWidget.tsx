import { Timeline } from '@/components/ui/Timeline'
import { Avatar, AvatarProps } from '@/components/ui/Avatar'
import { CommonProps } from '@/@types/common'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { Tag } from '../ui'

const TimelineAvatar = ({ children, ...rest }: AvatarProps) => {
    return (
        <Avatar {...rest} size={25} shape="circle">
            {children}
        </Avatar>
    )
}

const UnixDateTime = ({ value }: { value: number }) => {
    return <>{dayjs.unix(value).format('hh:mm A')}</>
}

const HighlightedText = ({ children, className }: CommonProps) => {
    return (
        <span
            className={classNames(
                'font-semibold text-gray-900 dark:text-gray-100',
                className,
            )}
        >
            {children}
        </span>
    )
}

const TimeLineWidget = () => {
    return (
        <div>
            <Timeline>
                <Timeline.Item
                    media={
                        <TimelineAvatar className="bg-amber-500">
                            J
                        </TimelineAvatar>
                    }
                >
                    <>
                        <div className="flex flex-col gap-y-0.5">
                            <HighlightedText> {'John Doe'}</HighlightedText>
                            <span className="text-xs">
                                <UnixDateTime value={1633024800} />
                            </span>
                        </div>
                        <div className="mt-4">
                            <span className="mx-1">assigned ticket</span>
                            <HighlightedText>{'TICKET-1234'}</HighlightedText>
                            <span className="mx-1">to</span>
                            <HighlightedText>{'Jane Smith'}</HighlightedText>
                        </div>
                    </>
                </Timeline.Item>
                <Timeline.Item
                    media={
                        <TimelineAvatar
                            src="/img/avatars/thumb-3.jpg"
                            className="bg-amber-500"
                        />
                    }
                >
                    <p className="my-1 flex items-center">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                            Ron Vargas
                        </span>
                        <span className="mx-2">comment on your </span>
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                            Post
                        </span>
                        <span className="ml-3 rtl:mr-3">2d ago</span>
                    </p>
                </Timeline.Item>
                <Timeline.Item media={<TimelineAvatar>J</TimelineAvatar>}>
                    <p className="flex items-center">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                            Joyce Freeman
                        </span>
                        <span className="mx-2">added tags </span>
                        <Tag
                            prefix
                            className="mr-2 rtl:ml-2 cursor-pointer"
                            prefixClass="bg-rose-500"
                        >
                            Live Issue
                        </Tag>
                        <Tag
                            prefix
                            className="mr-2 rtl:ml-2 cursor-pointer"
                            prefixClass="bg-blue-600"
                        >
                            Backend
                        </Tag>
                        <span className="ml-3 rtl:mr-3">2d ago</span>
                    </p>
                </Timeline.Item>
                <Timeline.Item>Dinner - 7:00</Timeline.Item>
            </Timeline>
        </div>
    )
}

export default TimeLineWidget
