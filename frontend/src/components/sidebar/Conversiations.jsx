import React from 'react'
import Conversiation from './Conversiation'

const Conversiations = () => {
  return (
    <div className='py-2 flex flex-col overflow-auto'>
      <Conversiation/>
      <Conversiation/>
      <Conversiation/>
      <Conversiation/>
      <Conversiation/>
    </div>
  )
}

export default Conversiations
