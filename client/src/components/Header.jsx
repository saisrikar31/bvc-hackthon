import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between items-center p-4 bg-gray-100'>
        <img src="../assets/application_logo.png" alt="Logo" className=""/>
        <div className='flex space-x-4'>
            <button>Login</button>
            <button>Create a free account</button>
        </div>
    </div>
  )
}

export default Header