import { injectReducer } from '@/store'
import reducer, {
    useAppSelector,
    useAppDispatch,
    listTemplatesALL,
    Delete,
} from '@/store/Master/template'
import { useEffect, useMemo, useState } from 'react'
import type { ColumnDef } from '@/components/shared/DataTable'
import DataTable from '@/components/shared/DataTable'
import { Badge, Checkbox, Input, Notification, toast } from '@/components/ui'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { listTemplatesALL_Res } from '@/@types/interfaces/Master/MAction_Template/listTemplatesALLInterface'
import { useLocation } from 'react-router-dom'
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

    const onEdit = () => {
        console.log('Edit', row)
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
                        title={'Successfuly deleed'}
                        type="success"
                        duration={2500}
                    >
                        Product successfuly added
                    </Notification>,
                    {
                        placement: 'top-center',
                    },
                )
            }
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

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(listTemplatesALL())
    }, [dispatch, location.pathname])

    const columns: ColumnDef<TemplateType>[] = useMemo(
        () => [
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
        ],
        [],
    )

    return (
        <div>
            <h3 className="mb-5">Template List</h3>
            <DataTable
                key={templateData.length}
                pagingData={{
                    total: templateData.length,
                    pageIndex: 1,
                    pageSize: 100,
                }}
                columns={columns}
                data={templateData}
            />
        </div>
    )
}

export default TemplateList
