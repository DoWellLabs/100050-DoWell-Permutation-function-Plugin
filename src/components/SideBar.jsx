import React, { useEffect, useState } from 'react';
import '../styles/sidebar.scss';
// import { useDispatch, useSelector } from 'react-redux';;
import { AiOutlineClockCircle, AiOutlineEdit, AiOutlineEye, AiOutlineMenu, AiOutlinePlusCircle , AiOutlineSetting } from 'react-icons/ai';

import { Link } from "react-router-dom";

const SideBar = () => {
    const [active,setActive] = useState(false);


    return (
        <>
            <aside className={`sidebar ${active? `active`:''}`}>
                <button className={`slideBtn x-large-fs light-gray`} onClick={()=>setActive(prev => !prev)}>
                    {AiOutlineMenu({})}
                </button>
                <div className={`logo`}>
                    <img src="/DoWell-Permutation.png" alt="" />
                    <h1 className='x-large-fs dark-gray semi-bold'>DoWell Permutation</h1>
                </div>
                <ul className={'ul'} role='list'>
                    <Link to='/'>
                        <li 
                            className={`li`} 
                            onClick={()=>setActive(false)}
                            >
                            <span className={`icon x-large-fs light-gray`}>{AiOutlineClockCircle({})}</span>
                            <p className={`text large-fs normal normal-gray`}>Recents</p>
                        </li >
                    </Link>
                    <Link to='/create-one'>
                        <li 
                            className={`li`} 
                            onClick={()=>setActive(false)}
                        >
                            <span className={`icon x-large-fs light-gray`}>{AiOutlinePlusCircle({})}</span>
                            <p className={`text large-fs normal normal-gray`}>Create one</p>
                        </li>
                    </Link>
                    <Link to='/view-one'>
                        <li 
                            className={`li `} 
                            onClick={()=>setActive(false)}
                        >
                            <span className={`icon x-large-fs light-gray`}>{AiOutlineEye({})}</span>
                            <p className={`text large-fs normal normal-gray`}>View one</p>
                        </li>
                    </Link>
                    <Link to='/edit-one'>
                        <li 
                            className={`li `} 
                            onClick={()=>setActive(false)}
                        >
                            <span className={`icon x-large-fs light-gray`}>{AiOutlineEdit({})}</span>
                            <p className={`text large-fs normal normal-gray`}>Edit one</p>
                        </li>
                    </Link>
                    <Link to='/settings'>
                        <li 
                            className={`li `} 
                            onClick={()=>setActive(false)}
                        >
                            <span className={`icon x-large-fs light-gray`}>{AiOutlineSetting({})}</span>
                            <p className={`text large-fs normal normal-gray`}>settings</p>
                        </li>
                    </Link>
                </ul>
                <div className='DoWell-logo'>
                    <p className='small-fs light light-gray'>developed by</p>
                    <img src="/logo.png" alt="" />
                    <p className='small-fs light light-gray'>&copy; 2023 dowellresearch.uk</p>
                </div>
            </aside>
            <div className={`blurOverLay ${active? `active`:''}`}></div>
        </>
    )
}

export default SideBar