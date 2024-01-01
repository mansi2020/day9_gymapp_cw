import React, { useEffect, useState } from 'react';
import axios from 'axios'; //axios library
import './Exerciselist.css';
import Exercisecard from '../Exercisecard/Exercisecard';

const Exerciselist = () => {
    // ------------------------useState variables--------------------
    let [exerciseData,setExerciseData] = useState([]);
    let [updatedExerciseData,setUpdatedExerciseData] = useState([...exerciseData]);
    let [inputText,setInputText] = useState("");

    // -------------------fetch exercise data from api------------------------
    useEffect(()=>{
        
        async function fetchData(){
            let url = 'https://exercisedb.p.rapidapi.com/exercises';
            
            const options = { 
                params: {limit: '20'},
                headers: {
                    'X-RapidAPI-Key': '4986fb1656msh3ef2babc5c69ce5p1f9345jsn4373e881a9bb',
                    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                }
            }
            try{
                const response = await axios.get(url,options);
                setExerciseData(response.data);
                setUpdatedExerciseData(response.data);
            }catch(error){
                console.log(error);
            }
        }
        fetchData();
    },[]);

    // --------------------------input given by user------------------------
    let searchInput = (e)=>{
        let updatedVal = e.target.value;
        setInputText(e.target.value);
        let updatedList = [...exerciseData];
        // filter data according input value
        if(updatedVal == ""){
            updatedList = [...exerciseData];
            // console.log("manya");
        }else{
            updatedList = updatedList.filter((item)=>{
                return item.bodyPart.toLowerCase().includes(updatedVal.toLowerCase()) || item.name.toLowerCase().includes(updatedVal.toLowerCase()) || item.target.toLowerCase().includes(updatedVal.toLowerCase()) ;
            })
        } 
        setUpdatedExerciseData(updatedList);

    }

  return (
    <div className='exerciselist-container'>
        <div className="exerciselist-header">
            <h1>Exercise List</h1>
            <input type="search" value={inputText} placeholder='Search by target,body part, or exercise' onChange={searchInput} />
        </div>
        <div className="exerciselist-content">
            {
                updatedExerciseData.map((exercise)=>{
                    return <Exercisecard {...exercise} key={exercise.id}/>
                })
            }
        </div>
    </div>
  )
}

export default Exerciselist
