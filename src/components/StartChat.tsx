import { useEffect, useState } from "react";
import ImageSpinner from "./ImageSpinner";
import { MoonLoader } from "react-spinners";
import SelectedLanguge from "./SelectLanguage";

const StartChat = (props: any) => {
    const [boxWidth,setBoxWidth] = useState(window.innerWidth);
    const [boxHeight,setBoxHeight] = useState(window.innerHeight);
    const [isSelectLang,setIsSelectLang] = useState(false);
    // const [isTalking, setIsTalking] = useState(false);
    const handleResize =() => {
      setBoxWidth(window.innerWidth)
      setBoxHeight(window.innerHeight)
    }
    useEffect(() => {
      setBoxWidth(window.innerWidth)
      setBoxHeight(window.innerHeight)
      window.addEventListener("resize", handleResize, false);
    }, []);        
    return (
        <>
          {
            isSelectLang?
              <div className="hiddenScrollBar" style={{backgroundColor:'#121212',position:'relative',width:boxWidth,height:boxHeight,overflowY:'scroll'}}>
                    {props.isLoading?
                        <div style={{width:'100%',height:'100%',backgroundColor:'black',position:'absolute',top:0,opacity:'0.8'}}></div>
                    :undefined}
                    {props.isLoading ?
                    <div style={{position:'absolute',width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <MoonLoader color="#0c63f0" />
                    </div>
                    :
                    undefined
                    }              
                    <div style={{marginTop: 50,maxHeight:80,minHeight:80,display:'flex',justifyContent:'center',alignItems:'center'}}>
                      <ImageSpinner isTalking={props.isTalking} />
                    </div>
                    {/* {props.isTalking ? 
                      <div style={{marginTop:'100px',display:'flex',justifyContent:'center'}}>
                        <div style={{color:'white',maxWidth:370,width:'90%',lineHeight:'26px',maxHeight:400,overflowY:'scroll'}}>
                          {props.introduction.text}
                        </div>
                      </div>
                    : */}
                      <div style={{display:'flex',justifyContent:'center',width:'100%',marginTop:'100px'}}>
                        <div style={{width:'90%',maxWidth:'350px'}}>
                            <div style={{color:'#FFFFFF',fontFamily:'Poppins-Regular',fontSize:18,textAlign:'center',lineHeight:'27px'}}>It’s Codie. Would you like to know more about me?</div>
                            <div onClick={() => {
                              props.start();
                            }} style={{width:'100%',borderRadius:5,marginTop:40,cursor:'pointer',backgroundColor:'#007BFF',height:'50px'}}>
                              <div style={{color:'#FFFFFF',fontSize:16,fontFamily:'Poppins-Regular',fontWeight:500,textAlign:'center',display:'flex',justifyContent:'center',alignItems:'center',height:'50px'}}>Start</div>
                            </div>
                            <div style={{textAlign:'center',marginTop:16}}>
                              <div onClick={() => props.cancel()} style={{color:'#007BFF',fontSize:16,cursor:'pointer'}}>Not Yet</div>
                            </div>
                        </div>
                      </div>
                    {/* } */}
              </div>
            :
              <SelectedLanguge setIsSelectLang={setIsSelectLang} setSelectedlangCode={props.setSelectedlangCode}></SelectedLanguge>
          }
        </>
    )
}

export default StartChat