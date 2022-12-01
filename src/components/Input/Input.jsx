import React from 'react'

export const Input = ({ placeholder, setFunc, value, type }) => {
   return (
      <input 
         type={type}
         className="form-control form-control-lg"
         placeholder={placeholder}
         onChange={e =>  setFunc(e.target.value)}
         value={value}
      />
   )
}
