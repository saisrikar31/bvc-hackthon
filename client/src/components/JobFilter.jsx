import React from 'react'

const JobFilter = () => {
    return (
        <div className='border rounded'>
            <div className="drawer">
                <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-1" className="btn drawer-button">Filters</label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 min-h-full w-80 p-4">
                        
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default JobFilter    