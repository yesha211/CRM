/* eslint-disable import/no-unresolved */
import { useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import * as Yup from 'yup'
import { Checkbox, Notification, Select, toast } from '@/components/ui'
import { SingleValue } from 'react-select'
import { Create_Req } from '@/@types/interfaces/Master/MAction_Template/CreateInterface'
import { AdaptableCard } from '@/components/shared'
import { useAppDispatch, Create } from '@/store/Master/template'
import { useNavigate } from 'react-router-dom'
import { FiSave, FiTrash } from 'react-icons/fi'

export type SetSubmitting = (isSubmitting: boolean) => void

export type OnDeleteCallback = React.Dispatch<React.SetStateAction<boolean>>

const validationSchema = Yup.object().shape({
    sMessage_to_send: Yup.string().required('Message to send is required'),
    sTemplate_ID: Yup.string().required(),
    sTemplate_Send_via: Yup.string().required('Template send via is required'),
})

type Create_Req_Data = Create_Req & Record<string, unknown>

interface OptionType {
    label: string
    value: string
}

const sTemplate_Send_via_options: OptionType[] = [
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

        const success = await dispatch(Create(formData))
        if (success) {
            toast.push(
                <Notification
                    title={'Successfully added'}
                    type="success"
                    duration={2500}
                >
                    Template successfully added
                </Notification>,
                {
                    placement: 'top-center',
                },
            )
            navigate('/testing/templateList')
        }
    }

    const onDelete = () => {
        console.log('Delete')
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
                                size="md"
                                isSearchable={true}
                                className={
                                    errors.sTemplate_Send_via
                                        ? 'border-red-500'
                                        : ''
                                }
                                placeholder="Choose Send via"
                                value={sTemplate_Send_via_options.find(
                                    (option) => option.value === sendVia,
                                )}
                                onChange={(option: SingleValue<OptionType>) => {
                                    if (option) {
                                        setSendVia(option.value)
                                    }
                                }}
                            ></Select>
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
