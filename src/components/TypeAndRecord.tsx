/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import mic2 from '../assets/mic2.svg';
import SendIcon from '../assets/Send.svg';
import keybordIcon from '../assets/keyboard.svg';
import logOutIcon from '../assets/fi_log-out.svg';

// _handleOfferClick
type TypeAndRecordProps ={
    _handleOfferClick : (text:string) => void
    setShowSugestions:(action:boolean)  =>void
    isRecording: boolean
    onstart:() => void
    onStop:() => void
    logout:() => void
    setIsTalking:(action:boolean) => void
}

const TypeAndRecord:React.FC<TypeAndRecordProps> = (
    {_handleOfferClick,isRecording,onstart,onStop,logout,setShowSugestions,setIsTalking}) => {
    const [text ,setText] = useState('')
    const [mode,setMode] = useState('Type');
    let mouseTimer: number;
    // const [isRecording,setIsRecording] = useState(false)
    const execMouseDown = () => {
        onStop()
    }
    const mouseUp =() => {
        if (mouseTimer) window.clearTimeout(mouseTimer);
    }
    const handleKeyPress = (event: any) => {
        setIsTalking(false)
        if (event.key === "Enter" && text.length > 0) {
            setText('') 
            _handleOfferClick(text)
        }
    };    
    return (
        <>
            {
                isRecording ?
                < >
                    <div id='recordButton' onMouseDown={() => {
                        mouseUp();
                        mouseTimer = window.setTimeout(execMouseDown,500);
                    }} onTouchMove={onStop} onMouseUp={mouseUp} style={{width:'100%',userSelect:'none',zIndex:2,height:'66px',borderTop:' 1px solid #FFFFFF',backgroundColor:'#2D2D2D',position:'absolute',bottom:0}}>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <img src='./icons/leftVector.svg' />
                            <div style={{color:'#FFFFFFDE',fontSize:'14px',height:'66px',fontFamily: 'Poppins-Regular',display:'flex',justifyContent:'center',alignItems:'center'}}>Slide to cancel</div>
                        </div>
                    </div>
                    <div style={{position:'absolute',width:'100%',bottom:0,height:150,overflow:'hidden'}}>
                        <div className="Acord-VoiceRecorder-WaveBox  Acord-VoiceRecorder-Wave1"></div>
                        <div className="Acord-VoiceRecorder-WaveBox  Acord-VoiceRecorder-Wave2"></div>
                        <div className="Acord-VoiceRecorder-WaveBox  Acord-VoiceRecorder-Wave3"></div>
                        <div className="Acord-VoiceRecorder-WaveBox  Acord-VoiceRecorder-Wave4"></div>                         
                    </div>
                    {/* <div style={{width:'100%',backgroundColor:'#2D2D2D',height:window.innerHeight / 3,borderRadius:'100%'}}></div> */}
                </>
                :
                <div style={{width:'100%',backgroundColor:'#1F1F1F',height:'45px',position:'fixed',bottom:21,display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <div style={{width:'90%',display:'flex',justifyContent:'start',alignItems:'center'}}>
                            <div onClick={() => {
                                if(mode =='Type') {
                                    setMode('Voice')
                                }else{
                                    setMode('Type')
                                }
                            }} style={{width:'32px',minWidth:32,minHeight:32,display:'flex',cursor:'pointer',justifyContent:'center',alignItems:'center',height:'32px',borderRadius:'100%',backgroundColor:'#353535',border:'1px solid #353535'}}>
                                {
                                    mode == 'Type' ?
                                        <img src={mic2} />
                                    :
                                        <img style={{width:16}} src={keybordIcon} />
                                }
                            </div>
                            <div style={{position:'relative',zIndex:60,width:'-webkit-fill-available',marginLeft:8}}>
                                {
                                    mode == 'Type'?
                                    <>
                                        <input onFocus={() => {
                                            if(window.innerWidth < 500) {
                                                setShowSugestions(false)
                                            }
                                        }} onKeyDown={handleKeyPress} value={text} onChange={(event) => setText(event.target.value)} type='text' placeholder='Message...' style={{width:'-webkit-fill-available',minWidth: '0px',fontFamily: 'Poppins-Regular',outline:'none',border:'none',color:'#FFFFFFDE',fontSize:'14px',fontWeight:300,paddingLeft:12,paddingRight:40,height:32,backgroundColor:'#2D2D2D',borderRadius:4 }} />
                                        {
                                            text.length > 0 ?
                                                <img onClick={() => {
                                                    _handleOfferClick(text)
                                                    setText('')
                                                }} style={{position:'absolute',top:'4px',right:'8px',cursor:'pointer'}} src={SendIcon} />
                                            :
                                            undefined
                                        }                            
                                    </>
                                    :
                                    <>
                                        <div onTouchStart={onstart} onMouseDown={()=> {onstart()}} style={{width:'-webkit-fill-available',cursor:'pointer',fontFamily: 'Poppins-Regular',outline:'none',border:'none',color:'#FFFFFFDE',fontSize:'14px',fontWeight:300,paddingLeft:12,paddingRight:40,height:35,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#2D2D2D',borderRadius:4 }}>
                                            <div>Hold to Talk</div>
                                        </div>
                                   
                                    </>
                                }
                            </div>
                            {
                                window.innerWidth > 520 ?
                                    <div onClick={logout} style={{width:'32px',minWidth:32,minHeight:32,marginLeft:8,display:'flex',cursor:'pointer',justifyContent:'center',alignItems:'center',height:'32px',borderRadius:'100%',backgroundColor:'#353535',border:'1.25px solid #282828'}}>
                                        <img style={{width:16}} src={logOutIcon} alt="" />
                                    </div>
                                :
                                undefined
                            }
                    </div>
                </div>
            }
        </>
    )
}
export default TypeAndRecord