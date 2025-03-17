/* eslint-disable import/no-unresolved */
import { useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import * as Yup from 'yup'
import { Checkbox, DatePicker, Radio, Select, TimeInput } from '@/components/ui'
import { Create_Req } from '@/@types/interfaces/Master/MAction_Template/CreateInterface'
import { AdaptableCard, RichTextEditor } from '@/components/shared'

import { FiSave, FiTrash } from 'react-icons/fi'
import TimeInputRange from '@/components/ui/TimeInput/TimeInputRange'

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

const colourOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9' },
    { value: 'blue', label: 'Blue', color: '#0052CC' },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630' },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
]

const TemplateNoForm = () => {
    const [sendVia, setSendVia] = useState('')
    const [templateId, setTemplateId] = useState('')
    const [messageToSend, setMessageToSend] = useState('')
    const [isInactive, setIsInactive] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const [date, setDate] = useState<Date | null>(null)
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
        null,
        null,
    ])
    const [dateTime, setDateTime] = useState<Date | null>(null)
    const [valueRadio, setValueRadio] = useState('')
    const [timeValue, setTimeValue] = useState<Date | null>(null)
    const [timeRangeValue, setTimeRangeValue] = useState<
        [Date | null, Date | null]
    >([null, null])

    const [selectedColours, setSelectedColours] = useState<string[]>([])

    const onFormSubmit = async () => {
        const formData: Create_Req_Data = {
            bInActive: isInactive,
            sMessage_to_send: messageToSend,
            sTemplate_ID: templateId,
            sTemplate_Send_via: sendVia,
            sDate: date,
            sDateRange: dateRange,
            sDateTime: dateTime,
            sTimeValue: timeValue,
            sTimeRangeValue: timeRangeValue,
            sValueRadio: valueRadio,
            sSelectedColours: selectedColours,
        }
        console.log(formData)

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
    }

    const onDelete = () => {
        console.log('Delete')
    }

    const handleDatePickerChange = (date: Date | null) => {
        setDate(date)
    }

    const handleRangePickerChange = (date: [Date | null, Date | null]) => {
        setDateRange(date)
    }

    const handleDateTimeChange = (val: Date | null) => {
        setDateTime(val)
    }

    const onChangeRadio = (value: string) => {
        setValueRadio(value)
    }

    return (
        <>
            <div>
                <div
                    id="Grid1_R1"
                    className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-5 "
                >
                    <div id="Grid1_R1_C1" className="lg:col-span-11 ">
                        <h3 className="">Template without Formik For States</h3>
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
                    </div>{' '}
                    <div
                        id="Grid2_R1"
                        className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-5 "
                    >
                        <div id="Grid2_R1_C1" className="lg:col-span-4 ">
                            <label className="font-semibold space-y-44">
                                Date Picker
                            </label>
                            <DatePicker
                                placeholder="Pick a date"
                                value={date}
                                onChange={handleDatePickerChange}
                            />
                        </div>
                        <div id="Grid2_R1_C2" className="lg:col-span-4 ">
                            <label className="font-semibold space-y-44">
                                Date Picker Range
                            </label>
                            <DatePicker.DatePickerRange
                                placeholder="Select dates range"
                                value={dateRange}
                                onChange={handleRangePickerChange}
                            />
                        </div>{' '}
                        <div id="Grid2_R1_C2" className="lg:col-span-4 ">
                            <label className="font-semibold space-y-44">
                                Date Time Picker
                            </label>
                            <DatePicker.DateTimepicker
                                placeholder="Pick date & time"
                                value={dateTime}
                                onChange={handleDateTimeChange}
                            />
                        </div>
                    </div>{' '}
                    <div
                        id="Grid2_R1"
                        className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-5 "
                    >
                        <div id="Grid2_R1_C1" className="lg:col-span-6 ">
                            <label className="font-semibold space-y-44">
                                Time Picker
                            </label>
                            <TimeInput
                                value={timeValue}
                                onChange={setTimeValue}
                            />
                        </div>
                        <div id="Grid2_R1_C2" className="lg:col-span-6 ">
                            <label className="font-semibold space-y-44">
                                Time Picker Range
                            </label>
                            <TimeInputRange
                                value={timeRangeValue}
                                onChange={setTimeRangeValue}
                            />
                        </div>
                    </div>
                    <div
                        id="Grid2_R3"
                        className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-5 "
                    >
                        <div id="Grid2_R3_C1" className="lg:col-span-12 ">
                            <Radio.Group
                                value={valueRadio}
                                onChange={onChangeRadio}
                            >
                                <Radio value={'Apple'}>Apple</Radio>
                                <Radio value={'Banana'}>Banana</Radio>
                                <Radio value={'Cherry'}>Cherry</Radio>
                            </Radio.Group>
                        </div>
                    </div>{' '}
                    <div
                        id="Grid2_R3"
                        className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-5 "
                    >
                        <div id="Grid2_R3_C1" className="lg:col-span-12 ">
                            <label className="font-semibold space-y-44">
                                Multi Select Colors
                            </label>
                            <Select
                                isMulti
                                placeholder="Please Select"
                                value={colourOptions.filter((option) =>
                                    selectedColours.includes(option.value),
                                )}
                                options={colourOptions}
                                onChange={(selectedOptions) =>
                                    setSelectedColours(
                                        selectedOptions.map(
                                            (option) => option.value,
                                        ),
                                    )
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
                            <RichTextEditor
                                placeholder="Enter Message to Send"
                                className={
                                    errors.sMessage_to_send
                                        ? 'border-red-500'
                                        : ''
                                }
                                value={messageToSend}
                                onChange={(value: string) =>
                                    setMessageToSend(value)
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
