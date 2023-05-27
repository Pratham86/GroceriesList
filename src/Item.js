import {FaTrashAlt } from 'react-icons/fa';

const Item = ({item,handleClick1,handleClick2}) => {
    return(
        <li className='item'>
            <input 
                type="checkbox"
                onChange={() => handleClick1(item.id)}
                checked = {item.checked}
            ></input>

            <label> {item.item} </label>

            <FaTrashAlt 
                role = "button" 
                tabIndex = '0'
                onClick={() => handleClick2(item.id)}
                aria-label = {`Delete ${item.item}`}
            />
        </li>
    )

}
export default Item;