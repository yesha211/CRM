import Card from '@/components/ui/Card'
import { Button } from '../ui'

const Card2 = () => {
    const cardHeader = (
        <div className="relative h-56 rounded-t-lg overflow-hidden">
            <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="card-image"
            />
        </div>
    )

    const cardFooter = (
        <div className="pt-2">
            <Button size="sm" variant="solid" color="blue">
                Read More
            </Button>
        </div>
    )

    return (
        <div className="max-w-xs">
            <Card
                className="  shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                header={cardHeader}
                footer={cardFooter}
                headerClass="p-0"
                footerBorder={false}
                headerBorder={false}
            >
                <h4 className="text-lg font-bold mb-2 text-blue-gray-700">
                    UI/UX Review Check
                </h4>
                <p className="text-gray-600">
                    The place is close to Barceloneta Beach and bus stop just 2
                    min by walk and near to &quot;Naviglio&quot; where you can
                    enjoy the main nightlife in Barcelona.
                </p>
            </Card>
        </div>
    )
}

export default Card2
