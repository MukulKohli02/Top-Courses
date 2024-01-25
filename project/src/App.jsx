import React, { useEffect, useState} from 'react';
import { filterData, apiurl} from './data';
import Navbar from './component/Navbar';
import Filter from './component/Filter';
import Cards from './component/Cards';
import { toast } from 'react-toastify';
import Spinner from './component/Spinner'

const App = () => {

  const[courses, setCourses] = useState([])
  const[loading, setLoading] = useState(true)
  async function fetchData(){
    setLoading(true)
    try{
      let response = await fetch(apiurl)
      let output = await response.json();
      setCourses(output.data)
    }
    catch(error){
      toast.error("Something went wrong")
    }
    setLoading(false)
  }
  useEffect( () => {
    fetchData();
  },[])
  return (
    <div className='container'>
      <div>
        <Navbar></Navbar>
      </div>

      <div>
        <Filter filterData = {filterData}></Filter>
      </div>

      <div>
        {
          loading ? (<Spinner/>) : (<Cards courses={courses}></Cards>)
        }
      </div>      
    </div>
  )
}

export default App
