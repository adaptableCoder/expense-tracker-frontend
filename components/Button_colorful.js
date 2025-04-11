import React from 'react'
import './Button_colorful.css'

const Button_colorful = ({text, disabled, tooltip, icon_code}) => {
  return (
    <div className="tooltip-container">
      <div className="btn-1">
        <span className={`flex gap-2 backdrop-blur-sm bg-black text-white transition-colors duration-500 text-md ${disabled ? 'disabled cursor-not-allowed' : ''}`}>
            {text}
            <lord-icon
              src={`https://cdn.lordicon.com/${icon_code}.json`}
              trigger="hover"
              colors="primary:#ffffff"
              style={{"width":"2rem","height":"2rem"}}>
            </lord-icon>
        </span>
      </div>
      {disabled && tooltip && <span className="tooltip-text">{tooltip}</span>}
    </div>
  )
}

export default Button_colorful
