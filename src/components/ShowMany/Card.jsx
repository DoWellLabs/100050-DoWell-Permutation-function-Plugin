import React, { useEffect, useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import '../../styles/card.css';
import { MdContentCopy } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai'

const User = ({choosen,setChoosen,index,id,date,setIdsArray,vars,colors,onCopy,onDelete,varsToWords}) => {
    const [words,setWords] = useState([])
    const {primaryColor,secondaryColor,textColor} = colors
    function handleClick(){
        if(choosen) {
            setChoosen(null)
        }else {
            setChoosen(index)
        }
    }
    function handleDelete(){
        setIdsArray(prev => {
            const filtered = prev.filter(e => e.inserted_id !== id)
            onDelete(filtered)
            return filtered
        })
    }

    function handleCopy(){
        navigator.clipboard.writeText(JSON.stringify(words,null,4));
        onCopy(JSON.stringify(words,null,4))
    }

    function handleCopyId(){
        navigator.clipboard.writeText(id);
        onCopy(id)
    }

    useEffect(()=>{
        let newWords = vars.map(e => {
            for(let i = 0; i<varsToWords.length ; i++){
                if(varsToWords[i].variable === e) {
                    return varsToWords[i].word
                }
            }
            return e
        })

        setWords(newWords)
    },[vars.length,varsToWords.length])
    return (
        <article className={`user ${choosen? 'active' : ''}`} style={{'--p':primaryColor,'--s':secondaryColor,'--t':textColor}}>
            <div className='details'>
                <h2 className='large-fs'>
                    {id}
                    <span className='x-large-fs' onClick={handleCopyId}>{MdContentCopy({})}</span>
                </h2>
                <p className='small-fs'>{date}</p> 
                <div className='icons'>
                    <span className='option x-large-fs' onClick={handleDelete}>{AiOutlineDelete({})}</span>
                </div>
            </div>
            <p onClick={handleClick} className={`icon ${choosen? 'active' : ''}`}>
                <span>
                    {RiArrowDropDownLine({})}
                </span>
            </p>
            <div className={`permutation ${choosen? 'active' : ''}`}>
                <pre className="code-block">
                    <code>
                        {
                            JSON.stringify(words,null,4)
                        }
                    </code>
                </pre>
                <span onClick={handleCopy} className='copy-icon x-large-fs light-gray'>
                    {MdContentCopy({})}
                </span>
            </div>
        </article>
    )
}

export default User