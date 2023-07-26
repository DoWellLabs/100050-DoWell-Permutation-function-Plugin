import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/create.css'
import '../../styles/global.css'

const Create = ({colors,onError,onSuccess}) => {
    const {primaryColor,secondaryColor,bgColor,textColor} = colors
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
                onError('only use numbers')
            }else {
                if(name === 'r'){
                    setFormData(prev => ({...prev,[name]:value}))
                }else {
                    if(parseInt(value) > 50) {
                        onError('variables amount should be 50 at max')
                    }else {
                        setFormData(prev => ({...prev,[name]:value}))
                    }
                }
            }
        }else {
            setFormData(prev => ({...prev,[name]:value[value.length - 1]}))
        }
    }

    const handleCreate = async (e) => {
        e.preventDefault();
        if(r === '' || n === '' || variable === ''){
            onError('make sure to fill up all the inputs')
        }else if(parseInt(r) > parseInt(n)){
            onError('Variables per permutation should be less than Total variables')
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
                    onSuccess({
                        permutationDetails:{id:json.inserted_id,date:new Date().toLocaleDateString()},
                        message:'Permutation created successfully'
                    })
                }

            }catch (err) {
                onError(err.message)
            }
            setLoading(false)
        }
    }
    return (
        <section className='create container'>
            <article className='holder'>
                <form style={{'--b':bgColor}}>
                    <label style={{'--t':textColor}} htmlFor="r" className='r-lable large-fs normal'> Variables per permutation</label>
                    <input 
                        className='r-input medium-fs light '
                        id='r'
                        name='r'
                        type="text"
                        value={r}
                        onChange={handleChange}
                        style={{'--t':textColor}}
                    />
                    <label style={{'--t':textColor}} htmlFor="n" className='n-lable large-fs normal '>Total variables</label>
                    <input 
                        className='n-input medium-fs light '
                        id='n'
                        name='n'
                        type="text"
                        value={n}
                        onChange={handleChange}
                        style={{'--t':textColor}}
                    />

                    <label style={{'--t':textColor}} htmlFor="variable" className='variable-lable large-fs normal'>first variable</label>
                    <input 
                        className='variable-input medium-fs light'
                        id='variable'
                        name='variable'
                        type="text"
                        value={variable}
                        onChange={handleChange}
                        style={{'--t':textColor}}
                    />
                    
                    <button 
                        style={{'--p':primaryColor,'--s':secondaryColor,'--t':textColor}}
                        className={`P-BTN ${loading && 'clicked'}`} onClick={handleCreate}>
                        Create
                    </button>
                </form>
            </article>
        </section>
    )
}

Create.propTypes = {
    colors: {
        primaryColor: PropTypes.string,
        secondaryColor: PropTypes.string,
        bgColor: PropTypes.string,
        textColor: PropTypes.string
    },
    onError: PropTypes.func,
    onSuccess: PropTypes.func
}

Create.defaultProps = {
    colors: {
        primaryColor: '#61ce70',
        secondaryColor: '#cef9d2',
        bgColor: '#F2F4F7',
        textColor: '#344054'
    },
    onError: undefined,
    onSuccess: undefined
}
export default Create