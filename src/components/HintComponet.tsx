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
    const [isLoading,setIsLoading] = useState(false)
    const [spinnerIndex,setSpinnerIndex] = useState(0);
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
        if(spinnerIndex <= 2){
            setTimeout(() => {
                setSpinnerIndex(spinnerIndex +1)
            }, 300);
        }else{
            setSpinnerIndex(0)
        }
    })
    const getHints =() => {
        if(showHint){
            setShowHint(false)
        }else{
            setIsLoading(true)
            Hint.getHints({instanceid:props.instanceId},(res) => {
                setHints(res.content.replace(/[0-9]/g, '#').split('#.'));
                setIsLoading(false)
                setShowHint(true)
            })            
        }
    }
    // const [hints,setHints] = useState(['Which one has a higher score?','Which one has a higher score?','Which one has a higher score?'])
    return (
        <>
            {!props.isloading && !props.isTalking? 
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
                    {
                        isLoading ?
                            <>
                                <div style={{width:32,height:32,borderRadius:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',border:'1px solid #007BFF'}}>                 
                                    <div>
                                        <div style={{width:6,height:6,borderRadius:'100%',backgroundColor:spinnerIndex == 0?'#007BFF':'white'}}></div>
                                    </div>
                                    <div style={{display:'flex',marginTop:3}}>
                                        <div style={{minWidth:6,minHeight:6,maxWidth:6,maxHeight:6,backgroundColor:spinnerIndex == 1?'#007BFF':'white',borderRadius:'100%'}}></div>
                                        <div style={{minWidth:6,minHeight:6,maxWidth:6,maxHeight:6,backgroundColor:spinnerIndex == 2?'#007BFF':'white',borderRadius:'100%',marginLeft:6}}></div>
                                    </div>
                                </div>
                            </>
                        :
                        <>
                            {toggleIcon ?
                                <img onClick={() => {     
                                    getHints()
                                }} style={{cursor:'pointer',width:32,height:32}} src={hintIcon2} alt="" /> 
                            :
                                <img  onClick={() => {     
                                    getHints()
                                }} style={{cursor:'pointer',width:32,height:32}} src={hintIcon} alt="" />
                            }
                        </>
                    }

                </div>
            : undefined}
        </>
    )
}
export default HintComponent