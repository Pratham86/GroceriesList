import Item from './Item';

const ItemList = ({list,handleClick1,handleClick2}) => {
    return(
        <ul type = "none">
            {list.map((item) =>(
                <Item 
                    key = {item.id}
                    item = {item}
                    handleClick1 = {handleClick1}
                    handleClick2 = {handleClick2}
                />
            ))}
        </ul>
    )

}
export default ItemList;