import React from 'react'

function Input(props) {
  return (
     <input
      {...props}
      className="border p-2 rounded-lg w-full"
    />
  )
}

export default Input