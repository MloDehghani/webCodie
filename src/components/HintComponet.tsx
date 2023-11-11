import { useState,useEffect } from 'react';
import hintIcon from '../assets/hint.svg';
import hintIcon2 from '../assets/hint2.svg';
import Hint from '../api/Hint';

type HintComponentProps = {
    send:(text:string) => void
    // hints:Array<string>
    isloading:boolean,
    isTalking:boolean;
    instanceId: string
}

const HintComponent = (props:HintComponentProps) => {
    const [showHint,setShowHint] = useState(false)
    const [toggleIcon,setToggleIcon] = useState(false)
    const [hints,setHints] = useState([])
    // const resolveIcon = () => {
    //     setTimeout(() => {
    //         setToggleIcon(!toggleIcon)
    //     }, 500);
    //     if(toggleIcon){
    //         return hintIcon
    //     }else {
    //         return hintIcon2
    //     }
    // }
    const [wite,setWite] = useState(true);
    useEffect(() => {
        if(!wite){
            setTimeout(() => {
                setToggleIcon(!toggleIcon)
            },500)
        }else{
            setTimeout(() => {
                setWite(false)
            },10000)
        }
    })
    useEffect(() => {
        if(showHint){
            setToggleIcon(false)
        }
    })
    useEffect(() => {
        console.log(props.instanceId)
        Hint.getHints({instanceid:props.instanceId},(res) => {
            console.log(res);
            setHints(res.content.replace(/[0-9]/g, '#').split('#.'));
        })          
    },[props.instanceId])
    // const [hints,setHints] = useState(['Which one has a higher score?','Which one has a higher score?','Which one has a higher score?'])
    return (
        <>
            {hints.length > 0 && !props.isloading && !props.isTalking? 
                <div style={{display:'flex',userSelect:'none',justifyContent:'end',height:'34px',alignItems:'center',width:'-webkit-fill-available'}}>
                    {
                        showHint ?
                            <div className='hiddenScrollBar' style={{display:'flex',alignItems:'center',width:'100%',overflowX:'scroll'}}>
                                {hints.filter((_item,index) => index != 0).map(item => {
                                    return (
                                        <div onClick={() => {
                                            setShowHint(false)
                                            props.send(item)}} style={{backgroundColor:'#1F1F1F',minWidth:'fit-content',cursor:'pointer',borderRadius:8,padding: '8px 10px',marginRight:8}}>
                                            <div style={{color:'#FFFFFFDE',fontSize:'12px',fontFamily:'Poppins-Regular'}}>{item}</div>
                                        </div>
                                    )
                                })}

                            </div>
                        :undefined
                    }
                    {toggleIcon ?
                        <img onClick={() => setShowHint(!showHint)} style={{cursor:'pointer',width:32,height:32}} src={hintIcon2} alt="" /> 
                    :
                        <img onClick={() => setShowHint(!showHint)} style={{cursor:'pointer',width:32,height:32}} src={hintIcon} alt="" />
                    }

                </div>
            : undefined}
        </>
    )
}
export default HintComponent