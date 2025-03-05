import React from 'react'

function Message({ value, className, type, children }) {
  return (
    <>
      <h1 type={type} className={className}>{value}</h1>
      {children}
    </>
  )
}

export default Message