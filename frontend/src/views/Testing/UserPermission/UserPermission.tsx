import { ColumnDef } from '@/components/shared'
import { Checkbox } from '@/components/ui'
import React, { useMemo } from 'react'
import Search from './Search'

interface UserPermissionType {
    roleId: string
    roleName: string
    canEdit: boolean
    canDelete: boolean
    canView: boolean
    canAdd: boolean
    canPrint: boolean
    canImport: boolean
    canExport: boolean
}

const UserPermission = () => {
    const tempData = [
        {
            roleId: '1',
            roleName: 'Admin',
            canEdit: true,
            canDelete: true,
            canView: true,
            canAdd: true,
            canPrint: true,
            canImport: true,
            canExport: true,
        },
        {
            roleId: '2',
            roleName: 'User',
            canEdit: true,
            canDelete: false,
            canView: true,
            canAdd: false,
            canPrint: true,
            canImport: false,
            canExport: true,
        },
        {
            roleId: '3',
            roleName: 'Guest',
            canEdit: false,
            canDelete: false,
            canView: true,
            canAdd: false,
            canPrint: false,
            canImport: false,
            canExport: false,
        },
    ]

    const columns: ColumnDef<UserPermissionType>[] = useMemo(
        () => [
            {
                id: 'roleName',
                header: 'Role Name',
                accessorKey: 'roleName',
            },
            {
                id: 'canEdit',
                header: 'Can Edit',
                accessorKey: 'canEdit',
                cell: (props) => {
                    const { canEdit } = props.row.original
                    return (
                        <div className="flex items-center justify-center">
                            <Checkbox checked={canEdit} />
                        </div>
                    )
                },
            },
            {
                id: 'canDelete',
                header: 'Can Delete',
                accessorKey: 'canDelete',
                cell: (props) => {
                    const { canDelete } = props.row.original
                    return (
                        <div className="flex items-center justify-center">
                            <Checkbox checked={canDelete} />
                        </div>
                    )
                },
            },
            {
                id: 'canView',
                header: 'Can View',
                accessorKey: 'canView',
                cell: (props) => {
                    const { canView } = props.row.original
                    return (
                        <div className="flex items-center justify-center">
                            <Checkbox checked={canView} />
                        </div>
                    )
                },
            },
            {
                id: 'canAdd',
                header: 'Can Add',
                accessorKey: 'canAdd',
                cell: (props) => {
                    const { canAdd } = props.row.original
                    return (
                        <div className="flex items-center justify-center">
                            <Checkbox checked={canAdd} />
                        </div>
                    )
                },
            },
            {
                id: 'canPrint',
                header: 'Can Print',
                accessorKey: 'canPrint',
                cell: (props) => {
                    const { canPrint } = props.row.original
                    return (
                        <div className="flex items-center justify-center">
                            <Checkbox checked={canPrint} />
                        </div>
                    )
                },
            },
            {
                id: 'canImport',
                header: 'Can Import',
                accessorKey: 'canImport',
                cell: (props) => {
                    const { canImport } = props.row.original
                    return (
                        <div className="flex items-center justify-center">
                            <Checkbox checked={canImport} />
                        </div>
                    )
                },
            },
            {
                id: 'canExport',
                header: 'Can Export',
                accessorKey: 'canExport',
                cell: (props) => {
                    const { canExport } = props.row.original
                    return (
                        <div className="flex items-center justify-center">
                            <Checkbox checked={canExport} />
                        </div>
                    )
                },
            },
        ],
        [],
    )

    return (
        <div>
            <h3 className="mb-5">User Permission</h3>
            <Search />
        </div>
    )
}

export default UserPermission
