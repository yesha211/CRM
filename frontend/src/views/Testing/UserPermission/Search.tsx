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

type SearchData = {
    title: string
    url: string
    icon?: string
    category: string
    categoryTitle: string
    canEdit?: boolean
    canDelete?: boolean
    canView?: boolean
    canAdd?: boolean
    canPrint?: boolean
    canImport?: boolean
    canExport?: boolean
}

type SearchResult = {
    title: string
    data: SearchData[]
}

type NavigationConfig = {
    title: string
    subMenu: {
        title: string
        path: string
        icon?: string
        type: string
        subMenu: {
            title: string
            path: string
            icon?: string
            type: string
        }[]
    }[]
}

const transformNavigationConfig = (configs: NavigationConfig[]) => {
    return configs.map((config) => ({
        title: config.title,
        data: config.subMenu.flatMap((sub) => {
            if (sub.type === 'item') {
                return {
                    title: sub.title,
                    url: sub.path,
                    icon: sub.icon,
                    category: config.title,
                    categoryTitle: config.title,
                }
            }

            return sub.subMenu.map((item) => ({
                title: item.title,
                url: item.path,
                icon: item.icon || sub.icon,
                category: config.title,
                categoryTitle: config.title,
            }))
        }),
    }))
}

const transformedData = transformNavigationConfig([
    ...testingNavigationConfig,
    ...widgetsNavigationConfig,
])

const _Search = () => {
    const [searchDialogOpen, setSearchDialogOpen] = useState(false)
    const [searchResult, setSearchResult] =
        useState<SearchResult[]>(transformedData)
    const [noResult, setNoResult] = useState(false)
    const [filteredData, setFilteredData] = useState<SearchData[]>([])

    const inputRef = useRef<HTMLInputElement>(null)

    const handleReset = () => {
        setSearchResult(transformedData)
        setFilteredData(transformedData.flatMap((category) => category.data))
        setNoResult(false)
    }

    const handleSearchOpen = () => {
        setSearchDialogOpen(true)
        handleReset()
    }

    const debounceFn = debounce(handleDebounceFn, 200)

    async function handleDebounceFn(query: string) {
        if (!query.trim()) {
            setSearchResult(transformedData)
            setFilteredData(
                transformedData.flatMap((category) => category.data),
            )
            setNoResult(false)
            return
        }

        const lowerCaseQuery = query.toLowerCase()

        const filteredResults = transformedData
            .map((category) => {
                const filteredData = category.data.filter((item) =>
                    item.title.toLowerCase().includes(lowerCaseQuery),
                )

                return filteredData.length > 0
                    ? { ...category, data: filteredData }
                    : null
            })
            .filter(Boolean) as SearchResult[] // Remove empty categories

        setSearchResult(filteredResults)
        setFilteredData(filteredResults.flatMap((category) => category.data))
        setNoResult(filteredResults.length === 0)
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        debounceFn(e.target.value)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        if (
            ((event.ctrlKey || event.metaKey) && event.key === 'k') ||
            event.key === 'K'
        ) {
            event.preventDefault() // Prevents the default browser search (Ctrl + K in some browsers)
            handleSearchOpen()
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    })

    useEffect(() => {
        if (searchDialogOpen) {
            const timeout = setTimeout(() => inputRef.current?.focus(), 100)
            return () => {
                clearTimeout(timeout)
            }
        }
    }, [searchDialogOpen])

    useEffect(() => {
        handleReset()
    }, [])

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
    ]

    return (
        <>
            <div>
                <div className="px-4 flex items-center  border-b border-gray-200 dark:border-gray-600">
                    <HiOutlineSearch className="text-xl" />
                    <input
                        ref={inputRef}
                        className="ring-0 outline-none w-full  p-4 text-base bg-transparent text-gray-900 dark:text-gray-100"
                        placeholder="Search..."
                        onChange={handleSearch}
                    />
                </div>
                <div className="py-6 px-5 max-h-[550px] overflow-y-auto overflow-x-auto">
                    <DataTable columns={columns} data={filteredData} />
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
