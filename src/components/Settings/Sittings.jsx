import React, { useEffect, useState } from 'react';
import '../../styles/sittings.css'
import { AiOutlinePlus , AiOutlineDelete } from 'react-icons/ai'
import PropTypes from 'prop-types';

const Settings = ({colors,onError,onSave,previous}) => {
    const {primaryColor,secondaryColor,bgColor,textColor} = colors
    const [vars,setVars] = useState([{variable:'',word:''}]);

    function handleAdd(e){
        e.preventDefault()
        if(vars.length < 1){
            setVars(prev => {
                let newVars = [...prev]
                newVars.push({variable:'',word:''})
                return newVars
            })
        }else {
            const {variable,word} = vars[vars.length - 1]
            if(variable === '' || word === ''){
                onError('make sure to fill up the inputs')
            }else {
                setVars(prev => {
                    let newVars = [...prev]
                    newVars.push({variable:'',word:''})
                    return newVars
                })
            }
        }
    }
    function handleDelete(index){
        setVars(prev => {
            let newVars = prev.filter((e,i) => i !== index)
            return newVars
        })
    }
    function handleChange(e,i){
        e.preventDefault()
        const { value,name } = e.target
        setVars(prev => {
            if(name === 'var'){
                let newVars = [...prev];
                let exists = prev.filter(e => e.variable === value[value.length - 1]).length > 0;
                if(exists){
                    onError('variable is already added')
                }else {
                    newVars[i].variable = value[value.length - 1]
                }
                return newVars
            }else {
                let newVars = [...prev]
                newVars[i].word = value
                return newVars
            }
        })
    }

    function handleSave(){
        const isThereEmpty = vars.filter(e => (e.variable === '' || e.word === '')).length > 0
        if(isThereEmpty){
            onError('make sure to fill up the inputs')
        }else {
            onSave(vars)
        }
    }

    useEffect(()=>{
        if(previous.length > 0) {
            setVars(previous)
        }
    },[])
    return (
        <section className='container settings'>
            <article className='holder' style={{'--p':primaryColor,'--s':secondaryColor,'--b':bgColor,'--t':textColor}}>
                <form action="">
                    <div className='labels'>
                        <label className='char-label large-fs normal normal-gray' htmlFor="">variable</label>
                        <label className='var-label large-fs normal normal-gray' htmlFor="">word</label>
                    </div>
                    {vars.map((e,i) => <div key={i} className='inputs'>
                        <input 
                            type="text"
                            className='var-input medium-fs light black'
                            name='var'
                            onChange={(e)=>handleChange(e,i)}
                            value={e.variable}
                        />
                        <input 
                            type="text"
                            className='char-input medium-fs light black'
                            name='char'
                            onChange={(e)=>handleChange(e,i)}
                            value={e.word}
                        />
                        <span onClick={()=>handleDelete(i)} className='delete x-large-fs'>
                            {AiOutlineDelete({})}
                        </span>
                    </div>)
                    }
                    <button className='add P-BTN' onClick={(e)=>handleAdd(e)}>
                        <span className='x-large-fs'>
                            {AiOutlinePlus({})}
                        </span>
                    </button>
                </form>
                <button className='save P-BTN' onClick={handleSave}>save</button>
            </article>
        </section>
    )
}

Settings.propTypes = {
    colors: {
        primaryColor: PropTypes.string,
        secondaryColor: PropTypes.string,
        bgColor: PropTypes.string,
        textColor: PropTypes.string
    },
    onSave: PropTypes.func,
    onError: PropTypes.func,
    previous: PropTypes.array
}

Settings.defaultProps = {
    colors: {
        primaryColor: '#61ce70',
        secondaryColor: '#cef9d2',
        bgColor: '#F2F4F7',
        textColor: '#344054'
    },
    onSave: undefined,
    onError: undefined,
    previous : []
}

export default Settings