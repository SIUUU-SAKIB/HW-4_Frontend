import React from 'react'

const LoadintSpinner = () => {
  return (
    <div className="relative w-16 h-16 min-h-screen min-w-screen">
  <div className="absolute inset-0 rounded-full bg-blue-500 blur-lg opacity-75 animate-ping"></div>
  <div className="relative w-full h-full border-4 border-blue-500 rounded-full animate-spin"></div>
</div>

  )
}

export default LoadintSpinner