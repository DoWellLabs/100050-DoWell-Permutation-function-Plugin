import React, { useEffect, useState } from 'react';
import '../styles/edit.scss';
import { AlertContext } from '../context/alertContext';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate();
    const [permutationa,setPermutationa] = useState([])
    const { id:page_id } = useParams()
    const { setAlertData } = AlertContext()
    const [formData,setFormData] = useState({
        id:'',
        variable:''
    })
    const {id,variable} = formData;
    function handleChange(e){
        const {value,name} = e.target 
        setFormData(prev => ({...prev,[name]:value}))
    }
    const handleAdd = (e) => {
        e.preventDefault()
        if(id === '' || variable === ''){
            setAlertData({msg:'make sure to fill all the inputs',type:'warrning',showen:true})
        }else {
            setLoading(true)
            fetch('https://100050.pythonanywhere.com/permutationapi/api/',{
                method:'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    "inserted_id": id,
                    "nextVariable":variable,
                    "command":"findPermutation"
                })
            })
            .then(res => res.json())
            .then(json => {
                if(json.message){
                    setAlertData({msg:json.message,type:'error',showen:true})
                }else {
                    setPermutationa(json.permutationsVariables)
                }
            })
            .catch(err => setAlertData({msg:err.message,type:'error',showen:true}))
            .finally(() => setLoading(false))
        }
    }

    function handleSave(e){
        setLoading(true)
        fetch('https://100050.pythonanywhere.com/permutationapi/api/',{
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                "inserted_id":id,
                "selectedPermutation": e,
                "command":"savePermutation"
            })
        })
        .then(res => res.json())
        .then(json => {
            setAlertData({msg:json.message,type:'success',showen:true})
            navigate(`/view-one/${id}`)
        })
        .catch(err => setAlertData({msg:err.message,type:'error',showen:true}))
        .finally(() => setLoading(false))
    }

    function handleRandom(){
        setLoading(true)
        const random = Math.floor(Math.random() * permutationa.length);
        fetch('https://100050.pythonanywhere.com/permutationapi/api/',{
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                "inserted_id":id,
                "selectedPermutation": permutationa[random],
                "command":"savePermutation"
            })
        })
        .then(res => res.json())
        .then(json => {
            setAlertData({msg:json.message,type:'success',showen:true})
            navigate(`/view-one/${id}`)
        })
        .catch(err => setAlertData({msg:err.message,type:'error',showen:true}))
        .finally(() => setLoading(false))
    }

    useEffect(()=>{
        if(page_id) {
            setFormData(prev => ({...prev,id:page_id}));
        }
    },[])
    return (
        <section className='container edit'>
            <article>
                {permutationa.length > 0 ?
                    <div className='availabe-holder'>
                        <div className='availabe'>
                            <h2 className='large-fs normal normal-gray'>availabe Permutation</h2>
                            <button className={`P-BTN ${loading && 'clicked'}`} onClick={handleRandom}>save random one</button>
                        </div>
                        {permutationa.map((e,i)=><div key={i} className='permutation'>
                            <pre className="code-block-permutation">
                                <code>
                                    {
                                        JSON.stringify(e)
                                    }
                                </code>
                            </pre>
                            <button className={`P-BTN ${loading && 'clicked'}`} onClick={()=>handleSave(e)}>save</button>
                        </div>)
                        }
                        
                    </div>
                        :
                    <form action="">
                        <label htmlFor="id" className='large-fs normal normal-gray'>insert id</label>
                        <input 
                            className='id-input medium-fs light black'
                            type="text"
                            onChange={handleChange}
                            value={id}
                            name='id'
                            id='id'
                        />
                        <label htmlFor="variable" className='large-fs normal normal-gray'>new variable</label>
                        <input 
                            className='n-input medium-fs light black'
                            type="text"
                            onChange={handleChange}
                            value={variable}
                            name='variable'
                            id='variable'
                        />
                        <button
                            className={`P-BTN ${loading && 'clicked'}`}
                            onClick={handleAdd}
                        >Add</button>
                    </form>
                }
            </article>
        </section>
    )
}

export default Edit