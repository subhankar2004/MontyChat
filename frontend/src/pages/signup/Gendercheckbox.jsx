import React from 'react'

const Gendercheckbox = ({onCheckboxChange, selectedGender}) => {
  return (
    <div className='flex gap-2'>
      <div className="form-control">
        <label className={`cursor-pointer label gap-1 ${selectedGender === 'male' ? 'selected' : ''}`}>
          <span className="label-text">Male</span>
          <input 
            type="checkbox" 
            className="checkbox border-slate-900"
            checked={selectedGender === 'male'}
            onChange={() => onCheckboxChange('male')}
          />
        </label>
      </div>

      <div className='form-control'>
        <label className={`cursor-pointer label gap-1 ${selectedGender === 'female' ? 'selected' : ''}`}>
          <span className="label-text">Female</span>
          <input 
            type="checkbox" 
            className="checkbox border-slate-900"
            checked={selectedGender === 'female'}
            onChange={() => onCheckboxChange('female')}
          />
        </label>
      </div>
    </div>
  )
}

export default Gendercheckbox
