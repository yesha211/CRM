import { NavigationTree } from '@/@types/navigation'
import { ColumnDef, DataTable } from '@/components/shared'
import { Checkbox } from '@/components/ui'
import testingNavigationConfig from '@/configs/navigation.config/testing.navigation.config'
import { NAV_ITEM_TYPE_ITEM } from '@/constants/navigation.constant'
import React, { useMemo } from 'react'

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

    const extractNavItems = (navConfig: NavigationTree[]): NavigationTree[] => {
        return navConfig.flatMap((item) =>
            item.type === NAV_ITEM_TYPE_ITEM
                ? item
                : extractNavItems(item.subMenu || []),
        )
    }

    const tempData2 = extractNavItems(testingNavigationConfig)

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

    const columns2: ColumnDef<NavigationTree>[] = useMemo(
        () => [
            {
                id: 'title',
                header: 'Title',
                accessorKey: 'title',
            },
            {
                id: 'path',
                header: 'Path',
                accessorKey: 'path',
            },
            {
                id: 'authority',
                header: 'Authority',
                accessorKey: 'authority',
            },
            {
                id: 'type',
                header: 'Type',
                accessorKey: 'type',
            },
        ],
        [],
    )

    return (
        <div>
            <h3 className="mb-5">User Permission</h3>
            <DataTable
                key={tempData2[0].key}
                columns={columns2}
                data={tempData2}
            />
            <h3 className="mb-5">User Permission 2</h3>
            <DataTable
                key={tempData[0].roleId}
                columns={columns}
                data={tempData}
            />
        </div>
    )
}

export default UserPermission
