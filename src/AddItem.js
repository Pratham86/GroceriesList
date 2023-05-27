import { FaPlus } from 'react-icons/fa';
import { useRef } from 'react';

const AddItem = ({newItem , setNewItem , handleSubmit }) =>{

    const inputRef = useRef();

    return (
        <form className = 'addForm' onSubmit={handleSubmit}>
            <label htmlFor = 'addItem' > Add Item </label>
            <input  
                autoFocus
                ref = {inputRef}
                value = {newItem}
                onChange={(e) => setNewItem(e.target.value)}
                id = 'addItem'
                type = 'text'
                placeholder="Add Item"
                required
            />

            <button 
                type = 'submit'
                aria-label = 'Add Item'
                onClick = {() => inputRef.current.focus()}
            >
                <FaPlus 
                    role = "button" 
                    // tabIndex = '0'
                />
            </button>
        </form>
    )
}

export default AddItem;