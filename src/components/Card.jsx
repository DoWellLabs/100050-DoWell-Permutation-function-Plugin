import React from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import '../styles/card.scss';
import { MdContentCopy } from 'react-icons/md';
import { AiOutlineEdit,AiOutlineDelete } from 'react-icons/ai'
import { AlertContext } from '../context/alertContext';
import { Link } from 'react-router-dom';

const User = ({choosen,setChoosen,index,id,date,setIdsArray,vars}) => {
    const { setAlertData } = AlertContext()
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
            window.localStorage.setItem('recents',JSON.stringify(filtered));
            return filtered
        })
    }

    function handleCopy(){
        navigator.clipboard.writeText(JSON.stringify(vars,null,4));
        setAlertData({msg:'copied',type:'success',showen:true})
    }

    function handleCopyId(){
        navigator.clipboard.writeText(id);
        setAlertData({msg:'copied',type:'success',showen:true})
    }

    return (
        <article className={`user ${choosen? 'active' : ''}`}>
            <div className='details'>
                <h2 className='large-fs'>
                    {id}
                    <span className='x-large-fs' onClick={handleCopyId}>{MdContentCopy({})}</span>
                </h2>
                <p className='small-fs'>{date}</p> 
                <div className='icons'>
                    <Link to={`/edit-one/${id}`}>
                        <span className='option x-large-fs'>{AiOutlineEdit({})}</span>
                    </Link>
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
                            JSON.stringify(vars,null,4)
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