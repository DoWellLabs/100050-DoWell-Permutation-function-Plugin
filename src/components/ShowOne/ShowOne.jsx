import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import '../../styles/veiw.css';
import { MdContentCopy } from 'react-icons/md';
import View from './View.jsx';

const ShowOne = ({colors,onError,onSuccess,onCopy,varsToWords}) => {
    const {primaryColor,secondaryColor,bgColor,textColor} = colors
    const [id,setId] = useState('')
    const [data, setData] = useState(null)

    useEffect(()=>{
        if(id !== ''){
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
            .then(json => {
                let newData = json
                if(newData.permutationsVariables.length === 1) {
                    let newvar = newData.permutationsVariables
                    for(let i = 0; i<varsToWords.length ; i++){
                        if(varsToWords[i].variable === newvar) {
                            newvar = varsToWords[i].word
                        }
                    }
                    newData.permutationsVariables = newvar
                }else {
                    let newVars = newData.permutationsVariables.map(e => {
                        for(let i = 0; i<varsToWords.length ; i++){
                            if(varsToWords[i].variable === e) {
                                return varsToWords[i].word
                            }
                        }
                        return e
                    })
                    newData.permutationsVariables = newVars
                }
                
                setData(newData)
                onSuccess('permutation found')
            })
            .catch(err => onError(err.message))
        }
    },[id])

    function handleCopy(){
        navigator.clipboard.writeText(JSON.stringify(data.permutationsVariables,null,4));
        onCopy(data.permutationsVariables)
    }

    return (
        <section className='view-one container' style={{'--p':primaryColor,'--s':secondaryColor,'--b':bgColor,'--t':textColor}}>
            {!data?
                <View setId={setId} />
            :
                <div className='view-holder'>
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


ShowOne.propTypes = {
    colors: {
        primaryColor: PropTypes.string,
        secondaryColor: PropTypes.string,
        bgColor: PropTypes.string,
        textColor: PropTypes.string
    },
    onError: PropTypes.func,
    onSuccess: PropTypes.func,
    onCopy: PropTypes.func,
    varsToWords:PropTypes.array
}

ShowOne.defaultProps = {
    colors: {
        primaryColor: '#61ce70',
        secondaryColor: '#cef9d2',
        bgColor: '#F2F4F7',
        textColor: '#344054'
    },
    onError: undefined,
    onSuccess: undefined,
    onCopy: undefined,
    varsToWords:[]
}

export default ShowOne