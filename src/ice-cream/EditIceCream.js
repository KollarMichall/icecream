import React, { useEffect, useRef, useState } from 'react'
import { getMenuItem, putMenuItem } from '../data/iceCreamData'
import useUniqueIds from '../hooks/useUniqueIds'
import LoaderMessage from '../structure/LoaderMessage'
import Main from '../structure/Main'
import '../styles/forms-spacer.scss'
import IceCreamImage from './IceCreamImage'

const EditIceCream = ({ match, history }) => {
    const [menuItem, setMenuItem] = useState({
        id: '' ,
        price: '0.00',
        inStock: true,
        quantity: '0',
        description: '',
        iceCream: {}
    })
    const isMounted = useRef(true)
    const [isLoading, setIsLoading] = useState(false)
    const [descriptionId, stockId, quantityId, priceId] = useUniqueIds(4)

    useEffect(() => {
        
        return () => {
            isMounted.current = false
        }
    }, [])

    useEffect(() => {
        setIsLoading(true)
       getMenuItem(match.params.menuItemId)
       .then(({id, price, inStock, quantity, description, iceCream}) => {
        if (isMounted.current) {
            setMenuItem({
                   id,
                   price: price.toFixed(2),
                   inStock,
                   quantity: quantity.toString(),
                   description,
                   iceCream
               })
               setIsLoading(false)
               
            }  

       }).catch(err => {
           if (err.status === 404 && isMounted.current ) {
               history.replace('/', {focus: true})
           }
       })
        
    }, [match.params.menuItemId, history])

    const onChangeHandler = e => {
        let newItemData = {
            ...menuItem,
            [e.target.name]:e.target.type === 'checkbox' ? e.target.checked : e.target.value
        }
        if (e.target.name === 'quantity') {
            newItemData.inStock = e.target.value !== '0'
        }
        if (e.target.name === 'inStock' && !e.target.checked) {
            newItemData.quantity = '0'
        }
        setMenuItem(newItemData)
    }
    const onSubmitHandler = e => {
        e.preventDefault();
        const { id, price, inStock, quantity, description, iceCream} = menuItem

        const submitItem = {
            id,
            iceCream: {id: iceCream.id},
            price: parseFloat(price),
            inStock,
            quantity: parseInt(quantity),
            description
        }
        putMenuItem(submitItem).then(() => {
            history.push('/', {focus: true})
        })
    }
    return (
        <Main headingText="Updated ice cream">

           <LoaderMessage 
           loadingMessage="Loading ice Cream"
           doneMessage="Ice cream loaded"
           isLoading={isLoading}
           />
           {!isLoading && 
             <div className="form-frame">
                 <div className="form-container">
                 <div className="image-container">
                         <IceCreamImage iceCreamId={menuItem.iceCream.id}/>
                 </div>
                     <dl>
                         <dt>Name :</dt>
                         <dd>{menuItem.iceCream.name}</dd>
                     </dl>
                     <form onSubmit={onSubmitHandler}>
                         <label htmlFor={descriptionId}>Description:</label>
                         <textarea type="textarea" row="3"
                         value={menuItem.description}
                         onChange={onChangeHandler}
                         id={descriptionId}
                         />
                         <label htmlFor={stockId}>In Stock :</label>
                         <input type="checkbox"
                         name="inStock"
                         checked={menuItem.inStock}
                         onChange={onChangeHandler}
                         id={stockId}
                         />
                         <label htmlFor={quantityId}>Quantity :</label>
                         <select name="quantity" value={menuItem.quantity}
                         onChange={onChangeHandler}
                         id={quantityId}
                         >
                             <option value="0">{menuItem.quantity}</option>
                             <option value="10">10</option>
                             <option value="20">20</option>
                             <option value="30">30</option>
                             <option value="40">40</option>
                             <option value="50">50</option>
                         </select>
                         <label htmlFor={priceId}>Price :</label>
                         <input type="number"
                         step="0.01"
                         name="price"
                         value={menuItem.price}
                         onChange={onChangeHandler}
                         id={priceId}
                         />
                         <button type="submit" color="green">Submit</button>
                     </form>
                 </div>
             </div>
           }
        </Main>
    )
}

export default EditIceCream
