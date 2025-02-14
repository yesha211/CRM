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
import { useAppDispatch, Create } from '@/store/Master/template'
import { useNavigate } from 'react-router-dom'

export type SetSubmitting = (isSubmitting: boolean) => void

export type OnDeleteCallback = React.Dispatch<React.SetStateAction<boolean>>

type OnDelete = (callback: OnDeleteCallback) => void

const validationSchema = Yup.object().shape({
    message_to_send: Yup.string().required('Message to send is required'),
    template_ID: Yup.string().required(),
    template_Send_via: Yup.string().required('Template send via is required'),
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

type initialType = {
    bInActive: boolean
    message_to_send: string
    template_ID: string
    template_Send_via: string
}

const initalData: initialType = {
    bInActive: false,
    message_to_send: '',
    template_ID: '',
    template_Send_via: '',
}

const sTemplate_Send_via_options = [
    { label: 'WhatsApp', value: 'WhatsApp' },
    { label: 'Email', value: 'Email' },
    { label: 'Both', value: 'Both' },
]

const TemplateFormik = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onFormSubmit = async (
        formData: initialType,
        setSubmitting: SetSubmitting,
    ) => {
        const data: Create_Req_Data = {
            bInActive: formData.bInActive,
            sMessage_to_send: formData.message_to_send,
            sTemplate_ID: formData.template_ID,
            sTemplate_Send_via: formData.template_Send_via,
        }

        const success = await dispatch(Create(data))
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
            navigate('/testing/templateList')
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
                onSubmit={(values: initialType, { setSubmitting }) => {
                    const formData = cloneDeep(values)
                    onFormSubmit?.(formData, setSubmitting)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <h3 className="mb-4">Add Template with Formik</h3>
                            <AdaptableCard className="mb-4">
                                <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                                    <div className="lg:col-span-2">
                                        <FormItem
                                            label="Send Via"
                                            invalid={
                                                (errors.template_Send_via &&
                                                    touched.template_Send_via) as boolean
                                            }
                                            errorMessage={
                                                errors.template_Send_via as string
                                            }
                                        >
                                            <Field name="template_Send_via">
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
                                                                template_Send_via,
                                                            ) =>
                                                                template_Send_via.value ===
                                                                values.template_Send_via,
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
                                                (errors.template_ID &&
                                                    touched.template_ID) as boolean
                                            }
                                            errorMessage={
                                                errors.template_ID as string
                                            }
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="template_ID"
                                                placeholder="Template ID"
                                                component={Input}
                                            />
                                        </FormItem>
                                    </div>
                                    <div className="lg:col-span-4">
                                        <FormItem
                                            label="Message to Send"
                                            invalid={
                                                (errors.message_to_send &&
                                                    touched.message_to_send) as boolean
                                            }
                                            errorMessage={
                                                errors.message_to_send as string
                                            }
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="on"
                                                name="message_to_send"
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

export default TemplateFormik
