import React, { useState } from 'react'
import { DefaultHome } from '../components/DefaultHome'

export const AppHome = () => {
    const [isloggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
        {isloggedIn ? <DefaultHome /> : (
            <DefaultHome />
        )}  
    </>
  )
}
