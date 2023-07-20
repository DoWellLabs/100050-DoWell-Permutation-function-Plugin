import React, { useState } from 'react';
import '../styles/sittings.scss'
import { AiOutlinePlus , AiOutlineDelete } from 'react-icons/ai'

const Sittings = () => {
    const [vars,setVars] = useState([]);

    function handleAdd(e){
        e.preventDefault()
        setVars(prev => {
            let newVars = [...prev]
            newVars.push({var:'',char:''})
            return newVars
        })
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
                let newVars = [...prev]
                newVars[i].var = value[value.length - 1]
                return newVars
            }else {
                let newVars = [...prev]
                newVars[i].char = value
                return newVars
            }
        })
    }
    return (
        <section className='container settings'>
            <article className='holder'>
                <form action="">
                    <div className='labels'>
                        <label className='char-label large-fs normal normal-gray' htmlFor="">character</label>
                        <label className='var-label large-fs normal normal-gray' htmlFor="">variable</label>
                    </div>
                    {vars.map((e,i) => <div key={i} className='inputs'>
                        <input 
                            type="text"
                            className='var-input medium-fs light black'
                            name='var'
                            onChange={(e)=>handleChange(e,i)}
                            value={e.var}
                        />
                        <input 
                            type="text"
                            className='char-input medium-fs light black'
                            name='char'
                            onChange={(e)=>handleChange(e,i)}
                            value={e.char}
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
                <button className='save P-BTN'>save</button>
            </article>
        </section>
    )
}

export default Sittings