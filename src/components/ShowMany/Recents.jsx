import React, { useEffect, useState } from 'react';
import '../../styles/recents.css';
import Card from './Card.jsx';
import '../../styles/global.css';
import PropTypes from 'prop-types';


const ShowMany = ({colors,onError,onSuccess,onCopy,onDelete,permutationsIds,varsToWords}) => {
    const { bgColor } = colors
    const [idsArray,setIdsArray] = useState([]);
    const [choosen,setChoosen] = useState(null);

    useEffect(()=>{
        const fetchAllData = async () => {
            let newArr = [];
            try {
                for(let i = 0; i < permutationsIds.length; i++){
                    const res = await fetch('https://100050.pythonanywhere.com/permutationapi/api/',{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body: JSON.stringify({
                            "inserted_id":permutationsIds[i].id,
                            "command":"showPermutation"
                        })
                    })
                    const json = await res.json()
                    if(res.ok){
                        newArr.push({...json,date:permutationsIds[i].date})
                    }
                }}
            catch (err) {
                onError(err.message)
            }
            setIdsArray(newArr)
            onSuccess('fetch completed')
        }
        if(permutationsIds){
            fetchAllData()
        }
    },[permutationsIds.length])
    return (
        <section className=' recents' style={{'--b':bgColor}}>
            <div className='cards-Holder'>
                {idsArray.map((e,i)=><Card 
                    id={e.inserted_id}
                    date={e.date}
                    vars={e.permutationsVariables}
                    key={i} 
                    choosen={choosen === i} 
                    setChoosen={setChoosen}
                    index={i}
                    setIdsArray={setIdsArray}
                    colors={colors}
                    onCopy={onCopy}
                    onDelete={onDelete}
                    varsToWords={varsToWords}
                    />)
                }
            </div>
        </section>
    )
}


ShowMany.propTypes = {
    colors: {
        primaryColor: PropTypes.string,
        secondaryColor: PropTypes.string,
        bgColor: PropTypes.string,
        textColor: PropTypes.string
    },
    permutationsIds: PropTypes.array.isRequired,
    onError: PropTypes.func,
    onSuccess: PropTypes.func,
    onCopy: PropTypes.func,
    onDelete: PropTypes.func.isRequired,
    varsToWords: PropTypes.array
}

ShowMany.defaultProps = {
    colors: {
        primaryColor: '#61ce70',
        secondaryColor: '#cef9d2',
        textColor: '#344054',
        bgColor: '#F2F4F7',
    },
    permutationsIds: [],
    onError: undefined,
    onSuccess: undefined,
    onCopy:undefined,
    onDelete:undefined,
    varsToWords:[]
}

export default ShowMany