import React from 'react'

interface CollapseProps {
    open: boolean
    children: React.ReactNode
    className?: string
}

const Collapse: React.FC<CollapseProps> = ({
    open,
    children,
    className = '',
}) => {
    return (
        <div
            className={`overflow-hidden transition-[max-height] duration-1000 ease-in-out ${
                open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            } ${className}`}
        >
            {children}
        </div>
    )
}

export default Collapse
