import React, { useEffect } from 'react'
import Header from './header'
import SearchItem from './SearchItem.js'
import AddItem from './AddItem'
import Content from './Content'
import Footer from './Footer'
import './index.css'
import apiRequest from './apiRequest';
import api from './api/Things';

function App() {
  const [list,setList] = React.useState([]);

  const [newItem , setNewItem] = React.useState("");
  const [search , setSearch] = React.useState("");

  const[fetchError , setFetchError] = React.useState(null);

  const[isLoading , setIsLoading] = React.useState(true);

  const API_URL = 'http://localhost:3500/items';

  // useEffect(() =>{
  //   const fetchItem = async () =>{
  //     try{
  //       const resp = await api.get('/items');
  //       setList(resp.data);
  //     }
  //     catch (err){
  //       if(err.resp){
  //         console.log(err.resp.data);
  //         console.log(err.resp.status);
  //         console.log(err.resp.headers);
  //       }
  //       else{
  //         console.log(err.message);
  //       }
  //     }
  //   }

  //   fetchItem();
  // },[])

  useEffect(() => {
    const fetchItems = async () => {
      try{
        const response = await fetch(API_URL);

        if (!response.ok) throw Error("Did not recieve data that was expected");

        const listItems = await response.json();
        setList(listItems);
        setFetchError(null);
      }
      catch(err){
        setFetchError(err.message);
      }
      finally{
        setIsLoading(false);
      }
    }
 
    setTimeout(() =>{

      (async () => await fetchItems())();
    },2000)
  },[]);

  const handleClick1 = async (id) =>{
      const newList = list.map((item) =>{
        if(item.id === id){
            return {...item , checked : !item.checked}
        }
        else{
            return item
        }
      }
      )
      setList(newList);
      const newItem = newList.filter((item) => item.id === id);
      
      const updateOptions = {
        method : 'PATCH',
        headers :{
          'Content-Type' : 'application/json'
        },

        body : JSON.stringify({checked : newItem[0].checked}) 
      }

      const reqUrl = `${API_URL}/${id}`;
      const res = await apiRequest(reqUrl , updateOptions);
      if (res) setFetchError(res);
      
  }

  const handleClick2 = async (id) =>{
      const newList = list.filter((item) => item.id !==id)
      setList(newList);

      const deleteOptions = {
        method : 'DELETE',
        headers :{
          'Content-Type' : 'application/json'
        }
      }
      const reqUrl = `${API_URL}/${id}`;
      const res = await apiRequest(reqUrl , deleteOptions);
      if (res) setFetchError(res);
  }

  const addItem = async (i) =>{
    const id = list.length !== 0 ? list[list.length-1].id+1 : 1;
    const myItem = {id : id , checked : false , item : i};
    const newList = [...list , myItem];
    setList(newList);

    const postOptions = {
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },

      body: JSON.stringify(myItem)
    }

    const result = await apiRequest(API_URL , postOptions)

    if(result) setFetchError(result);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    addItem(newItem);
    setNewItem('');
  }

  return (
    <div className="App">
      <Header />
      <SearchItem 
        search = {search}
        setSearch = {setSearch}
      />
      <AddItem
        newItem = {newItem}
        setNewItem = {setNewItem}
        handleSubmit = {handleSubmit}
      />
      <main className='Content'>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style = {{color : "red"}}>{`Error : ${fetchError}`}</p>}

        {!fetchError && !isLoading && <Content 
          list = {list.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleClick1 = {handleClick1}
          handleClick2 = {handleClick2}
        />}
      </main>
      <Footer length = {list.length} />
    </div>
  );
}

export default App;
