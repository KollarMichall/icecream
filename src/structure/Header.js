import React from 'react'
import FocusLink from './FocusLink'

const Header = () => {
    return (
        <header>
           <h1>ULTIMATE ICE CREAM</h1> 

           <nav>
               <FocusLink to="/" activeClassName="active" exact>Menu</FocusLink>
            </nav>
        </header>
    )
}

export default Header
