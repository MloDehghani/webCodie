import { useState } from 'react';
import hintIcon from '../assets/hint.svg';

type HintComponentProps = {
    send:(text:string) => void
    hints:Array<string>
}

const HintComponent = (props:HintComponentProps) => {
    const [showHint,setShowHint] = useState(false)
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
                <img onClick={() => setShowHint(!showHint)} style={{width:'32px',cursor:'pointer',height:32}} src={hintIcon} alt="" /> 

            </div>
        </>
    )
}
export default HintComponent