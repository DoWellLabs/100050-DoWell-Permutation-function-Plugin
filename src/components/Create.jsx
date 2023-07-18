import React, { useState } from 'react';
import '../styles/create.scss'
import { AlertContext } from '../context/alertContext'
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const navigate = useNavigate();
    const { setAlertData } = AlertContext()
    const [formData,setFormData] = useState({
        r:'',
        n:'',
        variable:''
    })
    const [loading,setLoading] = useState(false)

    const { r,n,variable} = formData

    function handleChange(e){
        const {value,name} = e.target
        if(name === 'r' || name === 'n'){
            if(value === ''){
                setFormData(prev => ({...prev,[name]:''}))
            }else if(isNaN(parseInt(value[value.length - 1]))){
                setAlertData({msg:'only use numbers',type:'warrning',showen:true})
            }else {
                if(name === 'r'){
                    setFormData(prev => ({...prev,[name]:value}))
                }else {
                    if(parseInt(value) > 25) {
                        setAlertData({msg:'variables amount should be 25 at max',type:'warrning',showen:true})
                    }else {
                        setFormData(prev => ({...prev,[name]:value}))
                    }
                }
            }
        }else {
            setFormData(prev => ({...prev,[name]:value}))
        }
    }

    const handleCreate = async (e) => {
        e.preventDefault();
        if(r === '' || n === '' || variable === ''){
            setAlertData({msg:'make sure to fill up all the inputs',type:'warrning',showen:true})
        }else if(parseInt(r) > parseInt(n)){
            setAlertData({msg:'Variables per permutation should be less than Total variables',type:'warrning',showen:true})
        }else {
            setLoading(true)
            try {
                const Res = await fetch('https://100050.pythonanywhere.com/permutationapi/api/',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "inserted_id": null,
                        "nextVariable":variable,
                        "n":JSON.parse(n),
                        "r":JSON.parse(r),
                        "command":"findPermutation"
                    })
                })

                const json = await Res.json()

                let newArr = JSON.parse(localStorage.getItem('recents'))
                if(newArr){
                    newArr.push({id:json.inserted_id,date: new Date().toLocaleDateString()})
                    localStorage.setItem('recents',JSON.stringify(newArr));
                }else {
                    localStorage.setItem('recents',JSON.stringify([{id:json.inserted_id,date: new Date().toLocaleDateString()}]));
                }

                const Res2 = await fetch('https://100050.pythonanywhere.com/permutationapi/api/',{
                    method:'POST',
                    headers : {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        "inserted_id":json.inserted_id,
                        "selectedPermutation":json.permutationsVariables[0],
                        "command":"savePermutation"
                    })
                })

                if(Res2.ok){
                    setAlertData({msg:'Permutation created successfully',type:'success',showen:true})
                    navigate(`/view-one/${json.inserted_id}`)
                }

            }catch (err) {
                setAlertData({msg:err.message,type:'error',showen:true})
            }
            setLoading(false)
        }
    }
    return (
        <section className='create container'>
            <article className='holder'>
                <form>
                    <label htmlFor="r" className='r-lable large-fs normal normal-gray'> Variables per permutation</label>
                    <input 
                        className='r-input medium-fs light black'
                        id='r'
                        name='r'
                        type="text"
                        value={r}
                        onChange={handleChange}
                    />
                    <label htmlFor="n" className='n-lable large-fs normal normal-gray'>Total variables</label>
                    <input 
                        className='n-input medium-fs light black'
                        id='n'
                        name='n'
                        type="text"
                        value={n}
                        onChange={handleChange}
                    />

                    <label htmlFor="variable" className='variable-lable large-fs normal normal-gray'>first variable</label>
                    <input 
                        className='variable-input medium-fs light black'
                        id='variable'
                        name='variable'
                        type="text"
                        value={variable}
                        onChange={handleChange}
                    />
                    
                    <button className={`P-BTN ${loading && 'clicked'}`} onClick={handleCreate}>
                        Create
                    </button>
                </form>
            </article>
        </section>
    )
}

export default Create