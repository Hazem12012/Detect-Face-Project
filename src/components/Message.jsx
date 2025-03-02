import React from 'react'

function Message({ value, className, type }) {
  return (
    <h1 type={type} className={className}>{value}</h1>
  )
}

export default Message