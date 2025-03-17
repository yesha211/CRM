/* eslint-disable import/no-unresolved */
import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import * as Yup from 'yup'
import { Checkbox, Notification, Select, toast } from '@/components/ui'
import { Create_Req } from '@/@types/interfaces/Master/MAction_Template/CreateInterface'
import { AdaptableCard, RichTextEditor } from '@/components/shared'
import reducer, {
    useAppDispatch,
    Create,
    Get,
    Update,
    useAppSelector,
    listTemplates,
} from '@/store/Master/template'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FiSave, FiTrash } from 'react-icons/fi'
import { injectReducer } from '@/store'
import AsyncSelect from 'react-select/async'

injectReducer('MAction_Template', reducer)

export type SetSubmitting = (isSubmitting: boolean) => void

export type OnDeleteCallback = React.Dispatch<React.SetStateAction<boolean>>

const validationSchema = Yup.object().shape({
    sMessage_to_send: Yup.string().required('Message to send is required'),
    sTemplate_ID: Yup.string().required(),
    sTemplate_Send_via: Yup.string().required('Template send via is required'),
})

type Create_Req_Data = Create_Req & Record<string, unknown>

const sTemplate_Send_via_options = [
    { label: 'WhatsApp', value: 'WhatsApp' },
    { label: 'Email', value: 'Email' },
    { label: 'Both', value: 'Both' },
]

const TemplateNoForm = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [sendVia, setSendVia] = useState('')
    const [templateId, setTemplateId] = useState('')
    const [messageToSend, setMessageToSend] = useState('')
    const [isInactive, setIsInactive] = useState(false)

    const [errors, setErrors] = useState<Record<string, string>>({})

    const [searchParams] = useSearchParams()
    const sTemplateGUIDURL = searchParams.get('sTemplateGUID')

    const sTemplateData = useAppSelector(
        (state) => state.MAction_Template.data.Get_State.data,
    )

    const templateIdData = useAppSelector(
        (state) => state.MAction_Template?.data?.listTemplates_State.data ?? [],
    )

    const [templateIdDD, setTemplateIdDD] = useState('')
    const [sTemplate_ID_options, setSTemplate_ID_options] = useState<
        { label?: string; value?: string }[]
    >([])

    useEffect(() => {
        if (sTemplateGUIDURL) {
            dispatch(Get({ sTemplateGUID: sTemplateGUIDURL }))
        }
        dispatch(listTemplates())
    }, [sTemplateGUIDURL, dispatch])

    useEffect(() => {
        if (sTemplateGUIDURL && sTemplateData) {
            setSendVia(sTemplateData?.sTemplate_Send_via || '')
            setTemplateId(sTemplateData?.sTemplate_ID || '')
            setMessageToSend(sTemplateData?.sMessage_to_send || '')
            setIsInactive(sTemplateData?.bInActive || false)
            setTemplateIdDD(sTemplateData?.sTemplateGUID || '')
        }
    }, [sTemplateData, sTemplateGUIDURL])

    useEffect(() => {
        if (templateIdData.length > 0) {
            const updatedOptions = templateIdData.map((item) => ({
                label: item.sTemplate_ID,
                value: item.sTemplateGUID,
            }))
            setSTemplate_ID_options(updatedOptions)
        }
    }, [templateIdData, sTemplateData])

    const onFormSubmit = async () => {
        const formData: Create_Req_Data = {
            bInActive: isInactive,
            sMessage_to_send: messageToSend,
            sTemplate_ID: templateId,
            sTemplate_Send_via: sendVia,
        }

        try {
            await validationSchema.validate(formData, { abortEarly: false })
            setErrors({})
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const validationErrors: Record<string, string> = {}
                err.inner.forEach((error) => {
                    if (error.path) {
                        validationErrors[error.path] = error.message
                    }
                })
                setErrors(validationErrors)
                return
            }
        }

        let response
        if (sTemplateGUIDURL) {
            response = await dispatch(
                Update({ ...formData, sTemplateGUID: sTemplateGUIDURL }),
            )
        } else {
            response = await dispatch(Create(formData))
            console.log(formData)
        }

        if (
            Update.fulfilled.match(response) ||
            Create.fulfilled.match(response)
        ) {
            toast.push(
                <Notification title={'Success'} type="success" duration={2500}>
                    {sTemplateGUIDURL
                        ? 'Template successfully updated'
                        : 'Template successfully added'}
                </Notification>,
                {
                    placement: 'top-center',
                },
            )
            navigate('/testing/templateList')
        } else {
            toast.push(
                <Notification title={'Error'} type="danger" duration={2500}>
                    {response.error.message}
                </Notification>,
                {
                    placement: 'top-center',
                },
            )
        }
    }

    const onDelete = () => {
        console.log('Delete')
    }

    const loadOptions = async (inputvalue: string) => {
        if (inputvalue.length < 2) {
            return []
        }

        await dispatch(listTemplates())

        const updatedOptions = templateIdData.map((item) => ({
            label: item.sTemplate_ID,
            value: item.sTemplateGUID,
        }))
        console.log(updatedOptions)
        setSTemplate_ID_options(updatedOptions)

        return updatedOptions.filter(
            (i) => i.label?.toLowerCase().includes(inputvalue.toLowerCase()),
        )
    }

    return (
        <>
            <div>
                <div
                    id="Grid1_R1"
                    className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-5 "
                >
                    <div id="Grid1_R1_C1" className="lg:col-span-11 ">
                        <h3 className="">Template without Formik</h3>
                    </div>
                    <div id="Grid1_R1_C2" className="lg:col-span-1 ">
                        <div id="H_Flex1" className="flex flex-row ">
                            <Button
                                variant="solid"
                                size="sm"
                                color="red-600"
                                icon={<FiTrash />}
                                className="mr-3"
                                shape="round"
                                onClick={onDelete}
                            ></Button>
                            <Button
                                variant="solid"
                                size="sm"
                                color="green-600"
                                icon={<FiSave />}
                                className=""
                                shape="round"
                                onClick={onFormSubmit}
                            ></Button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="Spacer1" className=" h-[20px]"></div>
            <AdaptableCard id="Card1" className="mb-4 ">
                <div>
                    <div
                        id="Grid2_R1"
                        className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-5 "
                    >
                        <div id="Grid2_R1_C1" className="lg:col-span-6 ">
                            <label className="font-semibold space-y-44">
                                Send via
                            </label>
                            <Select
                                options={sTemplate_Send_via_options}
                                className={
                                    errors.sTemplate_Send_via
                                        ? 'border-red-500'
                                        : ''
                                }
                                placeholder="Choose Send via here"
                                value={sTemplate_Send_via_options.find(
                                    ({ value }) => value === sendVia,
                                )}
                                onChange={(option) =>
                                    option && setSendVia(option.value)
                                }
                            />

                            {errors.sTemplate_Send_via && (
                                <p className="text-red-500 text-sm">
                                    {errors.sTemplate_Send_via}
                                </p>
                            )}
                        </div>
                        <div id="Grid2_R1_C2" className="lg:col-span-6 ">
                            <label className="font-semibold space-y-44">
                                Template ID
                            </label>
                            <Input
                                placeholder="Enter Template ID"
                                size="md"
                                className={
                                    errors.sTemplate_ID ? 'border-red-500' : ''
                                }
                                value={templateId}
                                onChange={(e) => setTemplateId(e.target.value)}
                            />
                            {errors.sTemplate_ID && (
                                <p className="text-red-500 text-sm">
                                    {errors.sTemplate_ID}
                                </p>
                            )}
                        </div>
                    </div>
                    <div
                        id="Grid2_R2"
                        className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-5 "
                    >
                        <div id="Grid2_R2_C1" className="lg:col-span-12 ">
                            <label className="font-semibold space-y-44">
                                Template ID
                            </label>
                            <Select
                                cacheOptions
                                loadOptions={loadOptions}
                                componentAs={AsyncSelect}
                                placeholder="Choose TemplateID"
                                value={sTemplate_ID_options.find(
                                    ({ value }) => value === templateIdDD,
                                )}
                                onChange={(option) =>
                                    option &&
                                    setTemplateIdDD(option.value ?? '')
                                }
                            />
                        </div>
                    </div>
                    <div
                        id="Grid2_R2"
                        className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-5 "
                    >
                        <div id="Grid2_R2_C1" className="lg:col-span-12 ">
                            <label className="font-semibold space-y-44">
                                Message to Send
                            </label>
                            <Input
                                textArea
                                placeholder="Enter Message to Send"
                                size="md"
                                className={
                                    errors.sMessage_to_send
                                        ? 'border-red-500'
                                        : ''
                                }
                                value={messageToSend}
                                onChange={(e) =>
                                    setMessageToSend(e.target.value)
                                }
                            />
                            {errors.sMessage_to_send && (
                                <p className="text-red-500 text-sm">
                                    {errors.sMessage_to_send}
                                </p>
                            )}
                        </div>
                    </div>{' '}
                    <div
                        id="Grid2_R2"
                        className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-5 "
                    >
                        <div id="Grid2_R2_C1" className="lg:col-span-12 ">
                            <label className="font-semibold space-y-44">
                                Message to Send
                            </label>
                            <RichTextEditor
                                placeholder="Enter Message to Send"
                                className={
                                    errors.sMessage_to_send
                                        ? 'border-red-500'
                                        : ''
                                }
                                value={messageToSend}
                                onChange={(val: string) =>
                                    setMessageToSend(val)
                                }
                            />
                            {errors.sMessage_to_send && (
                                <p className="text-red-500 text-sm">
                                    {errors.sMessage_to_send}
                                </p>
                            )}
                        </div>
                    </div>
                    <div
                        id="Grid2_R3"
                        className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-5 "
                    >
                        <div id="Grid2_R3_C1" className="lg:col-span-12 ">
                            <Checkbox
                                className=""
                                checked={isInactive}
                                onChange={(checked: boolean) =>
                                    setIsInactive(checked)
                                }
                            >
                                Inactive ?
                            </Checkbox>
                        </div>
                    </div>
                </div>
            </AdaptableCard>
        </>
    )
}

export default TemplateNoForm
