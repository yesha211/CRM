import React, { useEffect } from 'react'
import reducer, {
    // getAllCustomers,
    // getCustomerByEmail,
    // getCustomerData,
    // createCustomer,
    // updateCustomer,
    updateCustomerByParams,
    // deleteCustomer,
    useAppSelector,
    useAppDispatch,
    CustomerData,
} from '@/store/Testing/customer'
import { injectReducer } from '@/store'
import { Button } from '@/components/ui'

injectReducer('customer', reducer)

const Customer = () => {
    const dispatch = useAppDispatch()
    const customerState = useAppSelector((state) => state.customer.data)
    const sEmail = useAppSelector(
        (state) => state.customer.data.customerByEmail?.data?.sCustomerGUID,
    )
    const customerData = useAppSelector(
        (state) => state.customer.data.createdCustomer?.data,
    )

    useEffect(() => {
        // Dispatch all actions
        // dispatch(
        //     createCustomer({
        //         sCustomerName: 'John Doe',
        //         sEmail: 'royalswrag@123.com',
        //         sMobileNumber: '1234567890',
        //         sLanguage: ['English', 'Hindi'],
        //     }),
        // )
        // dispatch(getAllCustomers())
        // if (sEmail) {
        //     dispatch(getCustomerByEmail({ sEmail }))
        // }
        // if (sCustomerGUID) {
        //     dispatch(getCustomerData({ sCustomerGUID }))
        // }
    }, [dispatch, sEmail])

    // Log the state
    useEffect(() => {
        console.log('Customer State:', customerState)
    }, [customerState])

    return (
        <>
            <div id="Div1" className="">
                <h2 className="my-5">Customer</h2>
                <pre>{JSON.stringify(customerState, null, 2)}</pre>{' '}
                {/* Display state in UI */}
                <Button
                    onClick={() =>
                        customerData &&
                        dispatch(
                            updateCustomerByParams(
                                customerData as CustomerData,
                            ),
                        )
                    }
                >
                    BTN
                </Button>
            </div>
        </>
    )
}

export default Customer
