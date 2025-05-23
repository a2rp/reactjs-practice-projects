import React from 'react'
import { Wrapper } from './styled'

const Footer = () => {
    return (
        <Wrapper>
            <div className='copyright'>&copy; {new Date().getFullYear()} | All rights reserved.</div>
            <div className='coder'>Coded by <a href="http://www.ashishranjan.net">Ashish Ranjan</a></div>
        </Wrapper>
    )
}

export default Footer