import React from 'react'
import './Button_slice.css'

const Button_slice = ({text, disabled, tooltip}) => {
  return (
    <div className="tooltip-container">
      <div className={`btn-2 text-lg flex justify-center items-center ${disabled ? 'disabled cursor-not-allowed' : 'cursor-pointer'}`} disabled={disabled}>
        {text}
        <lord-icon
          src="https://cdn.lordicon.com/nfgmqqvs.json"
          trigger="hover"
          colors="primary:#ffffff"
          style={{"width":"2rem","height":"2rem"}}
          className="hover:colors-primary-black">
        </lord-icon>
      </div>
      {disabled && tooltip && <span className="tooltip-text">{tooltip}</span>}
    </div>
  )
}

export default Button_slice
