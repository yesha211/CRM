/* eslint-disable import/no-unresolved */
import { useState } from 'react'
import { FormContainer, FormItem } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import StickyFooter from '@/components/shared/StickyFooter'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { Field, FieldProps, Form, Formik } from 'formik'
import Input from '@/components/ui/Input'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import { Checkbox, Notification, Select, toast } from '@/components/ui'
import { Create_Req } from '@/@types/interfaces/Master/MAction_Template/CreateInterface'
import { AdaptableCard } from '@/components/shared'
import { useAppSelector, useAppDispatch, Create } from '@/store/Master/template'
import { useNavigate } from 'react-router-dom'

export type SetSubmitting = (isSubmitting: boolean) => void

export type OnDeleteCallback = React.Dispatch<React.SetStateAction<boolean>>

type OnDelete = (callback: OnDeleteCallback) => void

const validationSchema = Yup.object().shape({
    sMessage_to_send: Yup.string().required('Message to send is required'),
    sTemplate_ID: Yup.string().required('Template ID is required'),
    sTemplate_Send_via: Yup.string().required('Template send via is required'),
})

const DeleteProductButton = ({ onDelete }: { onDelete: OnDelete }) => {
    const [dialogOpen, setDialogOpen] = useState(false)

    const onConfirmDialogOpen = () => {
        setDialogOpen(true)
    }

    const onConfirmDialogClose = () => {
        setDialogOpen(false)
    }

    const handleConfirm = () => {
        onDelete?.(setDialogOpen)
    }

    return (
        <>
            <Button
                className="text-red-600"
                variant="plain"
                size="sm"
                icon={<HiOutlineTrash />}
                type="button"
                onClick={onConfirmDialogOpen}
            >
                Delete
            </Button>
            <ConfirmDialog
                isOpen={dialogOpen}
                type="danger"
                title="Delete Item"
                confirmButtonColor="red-600"
                onClose={onConfirmDialogClose}
                onRequestClose={onConfirmDialogClose}
                onCancel={onConfirmDialogClose}
                onConfirm={handleConfirm}
            >
                <p>
                    Are you sure you want to delete this Template? All record
                    related to this Template will be deleted as well. This
                    action cannot be undone.
                </p>
            </ConfirmDialog>
        </>
    )
}

type Create_Req_Data = Create_Req & Record<string, unknown>

const initalData: Create_Req_Data = {
    bInActive: false,
    sMessage_to_send: '',
    sTemplate_ID: '',
    sTemplate_Send_via: '',
}

const sTemplate_Send_via_options = [
    { label: 'WhatsApp', value: 'WhatsApp' },
    { label: 'Email', value: 'Email' },
    { label: 'Both', value: 'Both' },
]

const Template = () => {
    const dispatch = useAppDispatch()
    const responseData = useAppSelector(
        (state) => state.MAction_Template?.data?.Create_State?.data,
    )
    console.log('responseData', responseData)
    const navigate = useNavigate()

    const onFormSubmit = async (
        formData: Create_Req_Data,
        setSubmitting: SetSubmitting,
    ) => {
        console.log('formData', formData)
        const success = await dispatch(Create(formData))
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Successfuly added'}
                    type="success"
                    duration={2500}
                >
                    Product successfuly added
                </Notification>,
                {
                    placement: 'top-center',
                },
            )
            navigate('/templateList')
        }
    }

    const onDelete = () => {
        console.log('Delete')
    }

    const onDiscard = () => {
        console.log('Discard')
    }

    return (
        <>
            <Formik
                initialValues={initalData}
                validationSchema={validationSchema}
                onSubmit={(values: Create_Req_Data, { setSubmitting }) => {
                    const formData = cloneDeep(values)
                    onFormSubmit?.(formData, setSubmitting)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <h3 className="mb-4">Add Template Information</h3>
                            <AdaptableCard className="mb-4">
                                <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                                    <div className="lg:col-span-2">
                                        <FormItem
                                            label="Send Via"
                                            invalid={
                                                (errors.sTemplate_Send_via &&
                                                    touched.sTemplate_Send_via) as boolean
                                            }
                                            errorMessage={
                                                errors.sTemplate_Send_via as string
                                            }
                                        >
                                            <Field name="sTemplate_Send_via">
                                                {({
                                                    field,
                                                    form,
                                                }: FieldProps) => (
                                                    <Select
                                                        field={field}
                                                        form={form}
                                                        options={
                                                            sTemplate_Send_via_options
                                                        }
                                                        value={sTemplate_Send_via_options.filter(
                                                            (
                                                                sTemplate_Send_via,
                                                            ) =>
                                                                sTemplate_Send_via.value ===
                                                                values.sTemplate_Send_via,
                                                        )}
                                                        onChange={(option) =>
                                                            form.setFieldValue(
                                                                field.name,
                                                                option?.value,
                                                            )
                                                        }
                                                    />
                                                )}
                                            </Field>
                                        </FormItem>
                                    </div>
                                    <div className="lg:col-span-2">
                                        <FormItem
                                            label="Template ID"
                                            invalid={
                                                (errors.sTemplate_ID &&
                                                    touched.sTemplate_ID) as boolean
                                            }
                                            errorMessage={
                                                errors.sTemplate_ID as string
                                            }
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="sTemplate_ID"
                                                placeholder="Template ID"
                                                component={Input}
                                            />
                                        </FormItem>
                                    </div>
                                    <div className="lg:col-span-4">
                                        <FormItem
                                            label="Message to Send"
                                            invalid={
                                                (errors.sMessage_to_send &&
                                                    touched.sMessage_to_send) as boolean
                                            }
                                            errorMessage={
                                                errors.sMessage_to_send as string
                                            }
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="on"
                                                name="sMessage_to_send"
                                                placeholder="Message to Send"
                                                component={Input}
                                                textArea={true}
                                            />
                                        </FormItem>
                                    </div>
                                    <div className="col-span-4">
                                        <FormItem
                                            label=""
                                            layout="vertical"
                                            invalid={
                                                (errors.bInActive &&
                                                    touched.bInActive) as boolean
                                            }
                                            errorMessage={
                                                errors.bInActive as string
                                            }
                                        >
                                            <Field
                                                name="bInActive"
                                                component={Checkbox}
                                            >
                                                Inactive
                                            </Field>
                                        </FormItem>
                                    </div>
                                </div>
                            </AdaptableCard>
                            <StickyFooter
                                className="-mx-8 px-8 flex items-center justify-between py-4"
                                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            >
                                <div>
                                    <DeleteProductButton
                                        onDelete={onDelete as OnDelete}
                                    />
                                </div>
                                <div className="md:flex items-center">
                                    <Button
                                        size="sm"
                                        className="ltr:mr-3 rtl:ml-3"
                                        type="button"
                                        onClick={() => onDiscard?.()}
                                    >
                                        Discard
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="solid"
                                        loading={isSubmitting}
                                        icon={<AiOutlineSave />}
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </StickyFooter>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default Template
