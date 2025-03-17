import { injectReducer } from '@/store'
import reducer, {
    useAppSelector,
    useAppDispatch,
    listTemplatesALL,
    Delete,
    MAction_TemplateupdatebInActive,
} from '@/store/Master/template'
import { useEffect, useMemo, useState, useRef, useCallback } from 'react'
import type { ColumnDef } from '@/components/shared/DataTable'
import DataTable, { DataTableResetHandle } from '@/components/shared/DataTable'
import { Badge, Checkbox, Notification, toast } from '@/components/ui'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { listTemplatesALL_Res } from '@/@types/interfaces/Master/MAction_Template/listTemplatesALLInterface'
import { useLocation, useNavigate } from 'react-router-dom'
import { ConfirmDialog } from '@/components/shared'

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

    const reduxTemplateData = useAppSelector(
        (state) =>
            state.MAction_Template?.data?.listTemplatesALL_State?.data ?? [],
    ) as TemplateType[]

    const [templateData, setTemplateData] =
        useState<TemplateType[]>(reduxTemplateData)

    const loading = useAppSelector(
        (state) => state.MAction_Template?.data?.loading,
    )

    const dispatch = useAppDispatch()
    const dataTableRef = useRef<DataTableResetHandle>(null) // Ref for DataTable

    useEffect(() => {
        dispatch(listTemplatesALL())
        dispatch(listTemplatesALL())
    }, [dispatch, location.pathname])

    useEffect(() => {
        setTemplateData(reduxTemplateData)
    }, [reduxTemplateData])

    const onCheckboxChange = useCallback(
        async (checked: boolean, sTemplateGUID: string) => {
            await dispatch(
                MAction_TemplateupdatebInActive({
                    sTemplateGUID,
                    bInActive: checked,
                }),
            )
            await dispatch(listTemplatesALL())
        },
        [dispatch],
    )

    const columns: ColumnDef<TemplateType>[] = useMemo(
        () => [
            {
                header: 'Inactive',
                accessorKey: 'bInActive',
                sortable: true,
                cell: (props) => {
                    const { bInActive, sTemplateGUID } = props.row.original
                    return (
                        <div className="flex items-center justify-center">
                            <Checkbox
                                checked={bInActive}
                                onChange={(checked) =>
                                    onCheckboxChange(
                                        checked,
                                        sTemplateGUID ?? '',
                                    )
                                }
                            />
                        </div>
                    )
                },
            },
            {
                header: 'Template ID',
                accessorKey: 'sTemplate_ID',
                sortable: true,
                cell: (props) => {
                    const { sTemplate_ID } = props.row.original
                    return <p>{sTemplate_ID}</p>
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
                    return <p>{sMessage_to_send}</p>
                },
            },

            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        [onCheckboxChange],
    )

    return (
        <div>
            <h3 className="mb-5">Template List Chekbox Single</h3>
            <DataTable
                ref={dataTableRef} // Attach ref to DataTable
                key={templateData.length}
                pagingData={{
                    total: templateData.length,
                    pageIndex: 1,
                    pageSize: 100,
                }}
                columns={columns}
                data={templateData}
                loading={loading} // Pass loading state to DataTable
            />
        </div>
    )
}

export default TemplateList
