import React, { useState } from 'react';
import '../styles/veiw.scss';
import { useNavigate } from 'react-router-dom';

const View = () => {
    const navigate = useNavigate()
    const [id,setId] = useState('')
    const handleClick = (e) => {
        e.preventDefault()
        if(id !== ''){
            navigate(`/view-one/${id}`)
        }
    }
    return (
        <section className='container view'>
            <article>
                <form action="">
                    <input 
                        type="text"
                        placeholder='Enter the insert id'
                        onChange={(e)=>setId(e.target.value)}
                        value={id}
                    />
                    <button
                        className='P-BTN'
                        onClick={handleClick}
                    >View</button>
                </form>
            </article>
        </section>
    )
}

export default View