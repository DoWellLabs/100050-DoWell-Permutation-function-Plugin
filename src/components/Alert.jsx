import { BiErrorCircle } from 'react-icons/bi';
import { VscError,VscPass } from 'react-icons/vsc';
import { AlertContext } from '../context/alertContext';



const Alert = () => {
    const {alertData} = AlertContext();


    return (
        <article className={`alert ${alertData.type} ${alertData.showen?'showen' :''}`}>
            <p className='TXT-normal'>{alertData.msg}</p>
            {alertData.type === 'error'? <span className='TXT-heading3'>{VscError({})}</span>:''}
            {alertData.type === 'warrning'? <span className='TXT-heading3'>{BiErrorCircle({})}</span>:''}
            {alertData.type === 'success'? <span className='TXT-heading3'>{VscPass({})}</span>:''}
        </article>
    )
}

export default Alert