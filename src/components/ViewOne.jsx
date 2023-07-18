import React, { useEffect, useState } from 'react'
import '../styles/veiw.scss';
import { useParams } from 'react-router-dom'
import { MdContentCopy } from 'react-icons/md';
import { AlertContext } from '../context/alertContext';

const ViewOne = () => {
    const { setAlertData } = AlertContext()
    const { id } = useParams();
    const [data, setData] = useState(null)

    useEffect(()=>{
        fetch('https://100050.pythonanywhere.com/permutationapi/api/',{
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                "inserted_id":id,
                "command":"showPermutation"
            })
        })
        .then(res => res.json())
        .then(json => setData(json))
        .catch(err => setAlertData({msg:err.message,type:'error',showen:true}))
    },[])

    function handleCopy(){
        navigator.clipboard.writeText(JSON.stringify(data.permutationsVariables,null,4));
        setAlertData({msg:'copied',type:'success',showen:true})
    }

    return (
        <section className='view-one container'>
            {!data?
                <h2>loading</h2>
            :
                <div>
                    <article className='details'>
                        <h2>
                            <span className='medium-fs normal'>Variables per permutation</span>
                            <p className='large-fs semi-bold dark-gray'>{data.r}</p>
                        </h2>
                        <h2>
                            <span className='medium-fs normal'>Total variables</span>
                            <p className='large-fs semi-bold dark-gray'>{data.n}</p>
                        </h2>
                        <h2>
                            <span className='medium-fs normal'>Permutation count</span>
                            <p className='large-fs semi-bold dark-gray'>{data.numberOfPermutations}</p>
                        </h2>
                        <h2>
                            <span className='medium-fs normal'>inserted id</span>
                            <p className='large-fs semi-bold dark-gray'>{id}</p>
                        </h2>
                    </article>
                    <article className='data'>
                    <div className={`permutation`}>
                        <pre className="code-block">
                            <code>
                                {
                                    JSON.stringify(data.permutationsVariables,null,4)
                                }
                            </code>
                        </pre>
                        <span className='copy-icon x-large-fs light-gray' onClick={handleCopy}>
                            {MdContentCopy({})}
                        </span>
                    </div>
                    </article>
                </div>
            }
        </section>
    )
}

export default ViewOne