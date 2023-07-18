import React, { useEffect, useState } from 'react';
import '../styles/recents.scss';
import Card from '../components/Card';
import { AlertContext } from '../context/alertContext';

const Recents = () => {
    const { setAlertData } = AlertContext()
    const [idsArray,setIdsArray] = useState([]);
    const [choosen,setChoosen] = useState(null);

    useEffect(()=>{
        const allIds = JSON.parse(window.localStorage.getItem('recents'))
        const fetchAllData = async () => {
            let newArr = [];
            try {
                for(let i = 0; i < allIds.length; i++){
                    const res = await fetch('https://100050.pythonanywhere.com/permutationapi/api/',{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body: JSON.stringify({
                            "inserted_id":allIds[i].id,
                            "command":"showPermutation"
                        })
                    })
                    const json = await res.json()
                    if(res.ok){
                        newArr.push({...json,date:allIds[i].date})
                    }
                }}
            catch (err) {
                setAlertData({msg:err.message,type:'error',showen:true})
            }
            setIdsArray(newArr)
        }
        if(allIds){
            fetchAllData()
        }
    },[])
    return (
        <section className='container recents'>
            <div className='cards-Holder'>
                <header>
                    <h2 className='heading2-fs light normal-gray'>Recents</h2>
                </header>
                {idsArray.map((e,i)=><Card 
                    id={e.inserted_id}
                    date={e.date}
                    vars={e.permutationsVariables}
                    key={i} 
                    choosen={choosen === i} 
                    setChoosen={setChoosen}
                    index={i}
                    setIdsArray={setIdsArray}
                    />)
                }
            </div>
        </section>
    )
}

export default Recents