import React from 'react';
import ItemList from './ItemList';

const Content = ({list,handleClick1,handleClick2}) =>{
    
    return(
        <>
            {list.length !== 0 ? (
           <ItemList 
                list = {list}
                handleClick1 = {handleClick1}
                handleClick2 = {handleClick2}
           />) :(<p>Your List is Empty</p>)}
        </>
    )

}
export default Content;