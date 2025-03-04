import { useState, useRef, useEffect } from 'react'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import debounce from 'lodash/debounce'
import { HiOutlineSearch } from 'react-icons/hi'
import Highlighter from 'react-highlight-words'
import DataTable from '@/components/shared/DataTable'
import { Checkbox } from '@/components/ui'
import type { ColumnDef } from '@/components/shared/DataTable'
import testingNavigationConfig from '@/configs/navigation.config/testing.navigation.config'
import widgetsNavigationConfig from '@/configs/navigation.config/widgets.navigation.config'
import { NavigationTree } from '@/@types/navigation'

type SearchData = {
    title: string
    keyId: string
    url?: string
    icon?: string
    category: string
    canEdit?: boolean
    canDelete?: boolean
    canView?: boolean
    canAdd?: boolean
    canPrint?: boolean
    canImport?: boolean
    canExport?: boolean
}

const transformNavigationConfig = (configs: NavigationTree[]) => {
    return configs.flatMap((config) => {
        const categoryEntry: SearchData = {
            title: config.title,
            keyId: config.key,
            category: config.title,
        }

        const subEntries = config.subMenu.flatMap((sub) => {
            if (sub.type === 'item') {
                return {
                    title: sub.title,
                    keyId: sub.key,
                    url: sub.path,
                    icon: sub.icon,
                    category: config.title,
                }
            }

            return sub.subMenu.map((item) => ({
                title: item.title,
                keyId: item.key,
                url: item.path,
                icon: item.icon || sub.icon,
                category: config.title,
            }))
        })

        return [categoryEntry, ...subEntries]
    })
}

const transformedData = transformNavigationConfig([
    ...testingNavigationConfig,
    ...widgetsNavigationConfig,
])

const _Search = () => {
    const [noResult, setNoResult] = useState(false)
    const [filteredData, setFilteredData] =
        useState<SearchData[]>(transformedData)

    const inputRef = useRef<HTMLInputElement>(null)

    const handleReset = () => {
        setFilteredData(transformedData)
        setNoResult(false)
    }

    const debounceFn = debounce(handleDebounceFn, 200)

    async function handleDebounceFn(query: string) {
        if (!query.trim()) {
            handleReset()
            return
        }

        const lowerCaseQuery = query.toLowerCase()

        const filteredResults = transformedData.filter((item) =>
            item.title.toLowerCase().includes(lowerCaseQuery),
        )

        setFilteredData(filteredResults)
        setNoResult(filteredResults.length === 0)
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        debounceFn(e.target.value)
    }

    useEffect(() => {
        handleReset()
    }, [])

    const handleCheckboxChange = (
        keyId: string,
        checked: boolean,
        field: string,
    ) => {
        // Call your API here with the keyId, checked value, and field
        console.log(
            `Checkbox changed: keyId=${keyId}, checked=${checked}, field=${field}`,
        )
        // Example API call
        // api.updatePermission({ keyId, checked, field })

        // Update the state to reflect the changes
        setFilteredData((prevData) =>
            prevData.map((item) => {
                if (item.keyId === keyId) {
                    return { ...item, [field]: checked }
                }
                if (item.category === keyId) {
                    return { ...item, [field]: checked }
                }
                return item
            }),
        )
    }

    const columns: ColumnDef<SearchData>[] = [
        {
            header: 'Title',
            accessorKey: 'title',
            cell: (props) => {
                const { title } = props.row.original
                return (
                    <Highlighter
                        autoEscape
                        highlightClassName="bg-yellow-200"
                        searchWords={[inputRef.current?.value || '']}
                        textToHighlight={title}
                    />
                )
            },
        },
        {
            header: 'Folder Name',
            enableSorting: false,
            accessorKey: 'category',
        },
        {
            id: 'canEdit',
            header: 'Can Edit',
            accessorKey: 'canEdit',
            cell: (props) => {
                const { canEdit, keyId } = props.row.original
                return (
                    <div className="flex items-center justify-center">
                        <Checkbox
                            checked={canEdit}
                            onChange={(checked) =>
                                handleCheckboxChange(keyId, checked, 'canEdit')
                            }
                        />
                    </div>
                )
            },
        },
        {
            id: 'canDelete',
            header: 'Can Delete',
            accessorKey: 'canDelete',
            cell: (props) => {
                const { canDelete, keyId } = props.row.original
                return (
                    <div className="flex items-center justify-center">
                        <Checkbox
                            checked={canDelete}
                            onChange={(checked) =>
                                handleCheckboxChange(
                                    keyId,
                                    checked,
                                    'canDelete',
                                )
                            }
                        />
                    </div>
                )
            },
        },
        {
            id: 'canView',
            header: 'Can View',
            accessorKey: 'canView',
            cell: (props) => {
                const { canView, keyId } = props.row.original
                return (
                    <div className="flex items-center justify-center">
                        <Checkbox
                            checked={canView}
                            onChange={(checked) =>
                                handleCheckboxChange(keyId, checked, 'canView')
                            }
                        />
                    </div>
                )
            },
        },
        {
            id: 'canAdd',
            header: 'Can Add',
            accessorKey: 'canAdd',
            cell: (props) => {
                const { canAdd, keyId } = props.row.original
                return (
                    <div className="flex items-center justify-center">
                        <Checkbox
                            checked={canAdd}
                            onChange={(checked) =>
                                handleCheckboxChange(keyId, checked, 'canAdd')
                            }
                        />
                    </div>
                )
            },
        },
        {
            id: 'canPrint',
            header: 'Can Print',
            accessorKey: 'canPrint',
            cell: (props) => {
                const { canPrint, keyId } = props.row.original
                return (
                    <div className="flex items-center justify-center">
                        <Checkbox
                            checked={canPrint}
                            onChange={(checked) =>
                                handleCheckboxChange(keyId, checked, 'canPrint')
                            }
                        />
                    </div>
                )
            },
        },
        {
            id: 'canImport',
            header: 'Can Import',
            accessorKey: 'canImport',
            cell: (props) => {
                const { canImport, keyId } = props.row.original
                return (
                    <div className="flex items-center justify-center">
                        <Checkbox
                            checked={canImport}
                            onChange={(checked) =>
                                handleCheckboxChange(
                                    keyId,
                                    checked,
                                    'canImport',
                                )
                            }
                        />
                    </div>
                )
            },
        },
        {
            id: 'canExport',
            header: 'Can Export',
            accessorKey: 'canExport',
            cell: (props) => {
                const { canExport, keyId } = props.row.original
                return (
                    <div className="flex items-center justify-center">
                        <Checkbox
                            checked={canExport}
                            onChange={(checked) =>
                                handleCheckboxChange(
                                    keyId,
                                    checked,
                                    'canExport',
                                )
                            }
                        />
                    </div>
                )
            },
        },
    ]

    return (
        <>
            <div>
                <div className="px-4 flex items-center border-b border-gray-200 dark:border-gray-600">
                    <HiOutlineSearch className="text-xl" />
                    <input
                        ref={inputRef}
                        className="ring-0 outline-none w-full p-4 text-base bg-transparent text-gray-900 dark:text-gray-100"
                        placeholder="Search..."
                        onChange={handleSearch}
                    />
                </div>
                <div className="py-6 px-5 max-h-[550px] overflow-y-auto overflow-x-auto">
                    <DataTable
                        columns={columns}
                        data={filteredData}
                        pagingData={{
                            total: filteredData.length,
                            pageIndex: 1,
                            pageSize: 100,
                        }}
                    />
                    {filteredData.length === 0 && noResult && (
                        <div className="my-10 text-center text-lg">
                            <span>No results for </span>
                            <span className="heading-text">
                                {`'`}
                                {inputRef.current?.value}
                                {`'`}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

const Search = withHeaderItem(_Search)

export default Search
