import React, { useEffect, useState } from 'react'
import { getMenu } from '../data/iceCreamData'
import LoaderMessage from '../structure/LoaderMessage'
import IceCreamImage from './IceCreamImage'
import Main from '../structure/Main'
import FocusLink from '../structure/FocusLink'

const Menu = () => {
    const [menu, setMenu] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let isMounted = true
        getMenu().then(menuData => {
            if (isMounted) {
                setMenu(menuData)
                setIsLoading(false)
            }
        })
        return () => {
            isMounted = false
        }
    }, [])
    return (
        <Main headingText="Rock your taste buds with one of these!" className="menu">
               
            <LoaderMessage isLoading={isLoading} 
            loadingMessage="Loading Menu..."
            doneMessage="Loading menu complete."/>
                

            {menu.length > 0 ? 

                <ul className="container">
            {menu.map(ice => 
                    <li key={ice.id}>
                        <section className="card">
                            <div className="image-container">
                                <IceCreamImage iceCreamId={ice.id}/>
                            </div>
                            <div className="text-container">
                                <h3><FocusLink to={`/menu-items/${ice.id}`}>{ice.iceCream.name}</FocusLink></h3>
                                <div className="content card-content">
                                    <p className="price">{`$${ice.price.toFixed(2)}`}</p>
                                    <p className={`stock${ice.inStock ? '' : ' out'}`}>
                                        {ice.inStock ? `${ice.quantity} in stock` : "Currently out of stock"}

                                    </p>
                                </div>
                                    <p className="description">{ice.description}</p>
                            </div>
                        </section>
                    </li>

                    )}
                </ul>
            : 

             !isLoading && <h5>You Menu is empty!</h5>
            
            }
        </Main>
    )
}

export default Menu
