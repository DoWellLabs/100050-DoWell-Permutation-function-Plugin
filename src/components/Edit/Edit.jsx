import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/edit.css';
import '../../styles/global.css';

const Edit = ({colors,id:insert_id,onError,onSuccess}) => {
    const {primaryColor,secondaryColor,bgColor,textColor} = colors
    const [loading,setLoading] = useState(false)
    const [permutationa,setPermutationa] = useState([])
    const [formData,setFormData] = useState({
        id:'',
        variable:''
    })
    const {id,variable} = formData;
    function handleChange(e){
        const {value,name} = e.target 
        if(name === 'id'){
            setFormData(prev => ({...prev,[name]:value}))
        }else {
            setFormData(prev => ({...prev,[name]:value[value.length - 1]}))
        }
    }
    const handleAdd = (e) => {
        e.preventDefault()
        if(id === '' || variable === ''){
            onError('make sure to fill all the inputs')
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
                    onError(json.message)
                }else {
                    setPermutationa(json.permutationsVariables)
                }
            })
            .catch(err => onError(err.message))
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
            onSuccess(json.message)
            setPermutationa([])
        })
        .catch(err => onError(err.message))
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
            onSuccess(json.message)
            setPermutationa([])
        })
        .catch(err => onError(err.message))
        .finally(() => setLoading(false))
    }

    useEffect(()=>{
        if(insert_id !== ''){
            setFormData(prev => ({...prev,id:insert_id}))
        }
    },[])
    return (
        <section className=' edit'>
            <article style={{'--p':primaryColor,'--s':secondaryColor,'--b':bgColor,'--t':textColor}}>
                {permutationa.length > 0 ?
                    <div className='availabe-holder'>
                        <div className='availabe'>
                            <h2 className='large-fs normal '>availabe Permutation</h2>
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
                        <label htmlFor="id" className='large-fs normal '>insert id</label>
                        <input 
                            className='id-input medium-fs light '
                            type="text"
                            onChange={handleChange}
                            value={id}
                            name='id'
                            id='id'
                        />
                        <label htmlFor="variable" className='large-fs normal '>new variable</label>
                        <input 
                            className='n-input medium-fs light '
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

Edit.propTypes = {
    colors: {
        primaryColor: PropTypes.string,
        secondaryColor: PropTypes.string,
        bgColor: PropTypes.string,
        textColor: PropTypes.string
    },
    id: PropTypes.string,
    onError: PropTypes.func,
    onSuccess: PropTypes.func
}

Edit.defaultProps = {
    colors: {
        primaryColor: '#61ce70',
        secondaryColor: '#cef9d2',
        bgColor: '#F2F4F7',
        textColor: '#344054'
    },
    id: PropTypes.string,
    onError: undefined,
    onSuccess: undefined
}

export default Edit