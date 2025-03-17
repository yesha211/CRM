import { injectReducer } from '@/store'
import reducer, {
    useAppSelector,
    useAppDispatch,
    listTemplatesALL,
    Delete,
    listTemplates,
} from '@/store/Master/template'
import { useEffect, useMemo, useState } from 'react'
import type { ColumnDef } from '@/components/shared/DataTable'
import DataTable from '@/components/shared/DataTable'
import {
    Badge,
    Button,
    Checkbox,
    Input,
    Notification,
    Select,
    toast,
} from '@/components/ui'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { listTemplatesALL_Res } from '@/@types/interfaces/Master/MAction_Template/listTemplatesALLInterface'
import { useLocation, useNavigate } from 'react-router-dom'
import { ConfirmDialog } from '@/components/shared'
import AsyncSelect from 'react-select/async'

injectReducer('MAction_Template', reducer)

const sendViaStatusColor: Record<
    string,
    {
        label: string
        dotClass: string
        textClass: string
    }
> = {
    WhatsApp: {
        label: 'WhatsApp',
        dotClass: 'bg-green-500',
        textClass: 'text-green-500',
    },
    Email: {
        label: 'Email',
        dotClass: 'bg-blue-500',
        textClass: 'text-blue-500',
    },
    Both: {
        label: 'Both',
        dotClass: 'bg-purple-500',
        textClass: 'text-purple-500',
    },
}

type TemplateType = Required<listTemplatesALL_Res>['data']

export type OnDeleteCallback = React.Dispatch<React.SetStateAction<boolean>>

const ActionColumn = ({ row }: { row: TemplateType }) => {
    const { textTheme } = useThemeClass()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(
            `/testing/templateDetailNoForm?sTemplateGUID=${row.sTemplateGUID}`,
        )
    }

    const onDelete = async () => {
        console.log('Delete', row)
        if (row.sTemplateGUID) {
            const success = await dispatch(
                Delete({ sTemplateGUID: row.sTemplateGUID }),
            )

            if (success) {
                toast.push(
                    <Notification
                        title={'Successfully deleted'}
                        type="success"
                        duration={2500}
                    >
                        Template successfully deleted
                    </Notification>,
                    {
                        placement: 'top-center',
                    },
                )
                dispatch(listTemplatesALL())
            } else {
                toast.push(
                    <Notification title={'Error'} type="danger" duration={2500}>
                        Template not found
                    </Notification>,
                    {
                        placement: 'top-center',
                    },
                )
            }
        }
        setDialogOpen(false)
    }

    const [dialogOpen, setDialogOpen] = useState(false)

    const onConfirmDialogOpen = () => {
        setDialogOpen(true)
    }

    const onConfirmDialogClose = () => {
        setDialogOpen(false)
    }

    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
            >
                <HiOutlinePencil />
            </span>

            <ConfirmDialog
                isOpen={dialogOpen}
                type="danger"
                title="Delete Item"
                confirmButtonColor="red-600"
                onClose={onConfirmDialogClose}
                onRequestClose={onConfirmDialogClose}
                onCancel={onConfirmDialogClose}
                onConfirm={onDelete}
            >
                <p>
                    Are you sure you want to delete this Template? All record
                    related to this Template will be deleted as well. This
                    action cannot be undone.
                </p>
            </ConfirmDialog>
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onConfirmDialogOpen}
            >
                <HiOutlineTrash />
            </span>
        </div>
    )
}

const TemplateList = () => {
    const location = useLocation()

    const templateData = useAppSelector(
        (state) =>
            state.MAction_Template?.data?.listTemplatesALL_State?.data ?? [],
    ) as TemplateType[]

    const templateIdData = useAppSelector(
        (state) => state.MAction_Template?.data?.listTemplates_State.data ?? [],
    )

    const dispatch = useAppDispatch()

    const [templateId, setTemplateId] = useState('')
    const [sTemplate_ID_options, setSTemplate_ID_options] = useState<
        { label?: string; value?: string }[]
    >([])
    const [selectedRows, setSelectedRows] = useState<TemplateType[]>([])

    useEffect(() => {
        dispatch(listTemplatesALL())
    }, [dispatch, location.pathname])

    const columns: ColumnDef<TemplateType>[] = useMemo(
        () => [
            {
                header: 'Template ID',
                accessorKey: 'sTemplate_ID',
                sortable: true,
                cell: (props) => {
                    const { sTemplate_ID } = props.row.original
                    return (
                        <Input
                            className="w-[200px] truncate"
                            defaultValue={sTemplate_ID}
                        />
                    )
                },
            },
            {
                header: 'File to Send',
                accessorKey: 'sFile_to_Send',
                cell: (props) => {
                    const { sFile_to_Send } = props.row.original
                    return <p>{sFile_to_Send}</p>
                },
            },
            {
                header: 'Send via',
                accessorKey: 'sTemplate_Send_via',
                cell: (props) => {
                    const { sTemplate_Send_via } = props.row.original

                    if (!sTemplate_Send_via) return null

                    return (
                        <div className="flex items-center gap-2">
                            <Badge
                                className={
                                    sendViaStatusColor[sTemplate_Send_via]
                                        ?.dotClass
                                }
                            />
                            <span
                                className={`capitalize font-semibold ${sendViaStatusColor[sTemplate_Send_via]?.textClass}`}
                            >
                                {sendViaStatusColor[sTemplate_Send_via]?.label}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'Message to Send',
                accessorKey: 'sMessage_to_send',
                size: 200,
                cell: (props) => {
                    const { sMessage_to_send } = props.row.original
                    return <p className="w-[250px]">{sMessage_to_send}</p>
                },
            },

            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
            {
                header: 'Inactive',
                accessorKey: 'bInActive',
                sortable: true,
                cell: (props) => {
                    const { bInActive } = props.row.original
                    return (
                        <div className="flex items-center justify-center">
                            <Checkbox readOnly checked={bInActive} />
                        </div>
                    )
                },
            },
        ],
        [],
    )

    const loadOptions = async (inputvalue: string) => {
        if (inputvalue.length < 1) {
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

    const handleRowSelect = (checked: boolean, row: TemplateType) => {
        setSelectedRows((prevSelectedRows) => {
            if (checked) {
                return [...prevSelectedRows, row]
            } else {
                return prevSelectedRows.filter(
                    (selectedRow) =>
                        selectedRow.sTemplateGUID !== row.sTemplateGUID,
                )
            }
        })
    }

    const handleAllRowSelect = (checked: boolean) => {
        setSelectedRows(checked ? templateData : [])
    }

    const handleSubmit = () => {
        console.log(selectedRows)
        toast.push(
            <Notification
                title={
                    selectedRows.length > 0
                        ? 'Selected Rows ID'
                        : 'No Selected Rows ID'
                }
                type="info"
                duration={2500}
            >
                {selectedRows.map((row) => row.sTemplate_ID).join(', ')}
            </Notification>,
            {
                placement: 'top-center',
            },
        )
    }

    return (
        <div>
            <h3 className="mb-5">Template List</h3>
            <div className="my-5 flex gap-5 justify-between">
                <div className="w-full">
                    <label className="font-semibold space-y-44">
                        Template ID
                    </label>
                    <Select
                        cacheOptions
                        loadOptions={loadOptions}
                        componentAs={AsyncSelect}
                        placeholder="Choose TemplateID"
                        value={sTemplate_ID_options.find(
                            ({ value }) => value === templateId,
                        )}
                        onChange={(option) =>
                            option && setTemplateId(option.value ?? '')
                        }
                    />
                </div>
                <div className="my-5">
                    <Button
                        className="mr-auto"
                        variant="default"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </div>
            </div>
            <DataTable
                key={templateData.length}
                selectable
                pagingData={{
                    total: templateData.length,
                    pageIndex: 1,
                    pageSize: 100,
                }}
                columns={columns}
                data={templateData}
                onCheckBoxChange={handleRowSelect}
                onIndeterminateCheckBoxChange={handleAllRowSelect}
            />
        </div>
    )
}

export default TemplateList
