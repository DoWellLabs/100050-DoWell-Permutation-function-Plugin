import React,{useState,useEffect,useContext,createContext} from "react";

const context = createContext();

export const AlertProvider = ({children}) =>{
    const [alertData,setAlertData] = useState({msg:'',type:'',showen:false});


    useEffect(()=>{
        if(alertData.showen){
            setTimeout(()=>{
                setAlertData(prev => ({...prev,showen:false}));
            },4000)
        }
    },[alertData.showen])
    return (
        <context.Provider value={{alertData,setAlertData}}>
            {children}
        </context.Provider>
    )
}


export const AlertContext = ()=> useContext(context)