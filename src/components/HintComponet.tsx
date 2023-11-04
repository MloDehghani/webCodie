import { useState,useEffect } from 'react';
import hintIcon from '../assets/hint.svg';
import hintIcon2 from '../assets/hint2.svg';

type HintComponentProps = {
    send:(text:string) => void
    hints:Array<string>
}

const HintComponent = (props:HintComponentProps) => {
    const [showHint,setShowHint] = useState(false)
    const [toggleIcon,setToggleIcon] = useState(false)
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
    useEffect(() => {
        setTimeout(() => {
            setToggleIcon(!toggleIcon)
        },500)
    })
    // const [hints,setHints] = useState(['Which one has a higher score?','Which one has a higher score?','Which one has a higher score?'])
    return (
        <>
            <div style={{display:'flex',userSelect:'none',justifyContent:'end',height:'34px',alignItems:'center'}}>
                {
                    showHint ?
                        <div className='hiddenScrollBar' style={{display:'flex',alignItems:'center',width:'100%',overflowX:'scroll'}}>
                            {props.hints.map(item => {
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
        </>
    )
}
export default HintComponent