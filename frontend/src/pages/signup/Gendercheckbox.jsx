import React from 'react'

const Gendercheckbox = () => {
  return (
    <div className='flex gap-2'>
    <div className="form-control">
      <label className="cursor-pointer label gap-1">
        <span className="label-text">Male</span>
        <input type="checkbox" className="checkbox border-slate-900" />
      </label>
    </div>

    <div className='form-control'>
    <label className="cursor-pointer label gap-1">
        <span className="label-text">Female</span>
        <input type="checkbox" className="checkbox border-slate-900" />
      </label>
    </div>
      
    </div>
  )
}

export default Gendercheckbox
