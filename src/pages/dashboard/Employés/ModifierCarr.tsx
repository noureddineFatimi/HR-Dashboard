import React from 'react'
import { useLocation } from 'react-router-dom'
import EmployéInformations from './EmployéInformations'

const ModifierCarr = () => {
    const location=useLocation()
    const {state}=location
    console.log(state)
    
  return (
    <>
    
    <EmployéInformations/>
    
    
    
    </>
  )
}

export default ModifierCarr