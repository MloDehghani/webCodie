import { useEffect, useState } from "react";
import { useConstructor } from "../help";
import Bots from "../api/Bots";
import TikIcon from '../assets/Tik.svg';
import untick from '../assets/unTick.svg';

const SelectedLanguge = (props:any) => {
    const [boxWidth,setBoxWidth] = useState(window.innerWidth);
    const [boxHeight,setBoxHeight] = useState(window.innerHeight);    
    const [selectedBox, setSelectedBox] = useState(0);   
    const [langs,setLangs] = useState([])
    useConstructor(() => {
        Bots.getLangs({apikey:'3f072114dc4b4b5a84eee6afc3008c2f'},(res) => {
            console.log(res);
            setLangs(res)
        })
    })
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
            <div className="hiddenScrollBar" style={{backgroundColor:'#121212',position:'relative',width:boxWidth,height:boxHeight,overflowY:'scroll'}}>
                <div style={{display:'flex',justifyContent:'center',width:'100%'}}>
                    <div style={{width:'90%',maxWidth:550,marginTop:32}}>
                        <img src="./images/translate.png" alt="" />
                        <div style={{fontSize:'20px',marginTop:32,color:'#FFFFFFDE',fontFamily:'Poppins-Regular'}}>
                            Choose your Preferred Language
                        </div>
                        <div style={{fontSize:16,fontFamily:'Poppins-Regular',fontWeight:'400',color:'#FFFFFF99',marginTop:16}}>
                            Please select your language
                        </div>

                        <div className="hiddenScrollBar" style={{width:'100%',marginTop:24,maxHeight:280,overflowY:'scroll'}}>
                            {langs.map((item:any,index:number) => {
                                return(
                                    <>
                                        <div onClick={() => {
                                            setSelectedBox(index+1)
                                            props.setSelectedlangCode({
                                                lan: item.language,
                                                code: item["voice_code "],                                                
                                            })
                                            localStorage.setItem('perLanguage',JSON.stringify({
                                                lan: item.language,
                                                code: item["voice_code "],                                                
                                            }))
                                            setTimeout(() => {
                                                props.setIsSelectLang(true)
                                            }, 1000);
                                        }} style={{backgroundColor:'#1F1F1F',cursor:'pointer',paddingRight:'16px',borderRadius:4,maxHeight:48,minHeight:48,marginBottom:8,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                                            <div style={{display:'flex',justifyContent:'start',marginLeft:32,alignItems:'center'}}>
                                                <div style={{width:24,height:24,marginRight:16,display:'flex',justifyContent:'center',alignItems:'center'}}>
                                                    <img style={{}} src={`https://flagcdn.com/w40/${item.country_code.toLowerCase().split(',')[0]}.png`}></img>
                                                </div>
                                                <div style={{color:'#FFFFFFDE',fontSize:'14px',fontWeight:500,fontFamily:'Poppins-Regular'}}>{item.language}</div>
                                            </div>
                                            {selectedBox === index+1 ? (
                                            <div
                                                style={{
                                                backgroundColor: '#007BFF',
                                                width: 24,
                                                height: 24,
                                                borderRadius: 100,
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                }}>
                                                <img src={TikIcon} alt="" />
                                            </div>
                                            ) : (
                                            <div
                                                style={{
                                                backgroundColor: '#353535',
                                                width: 24,
                                                height: 24,
                                                borderRadius: 100,
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                }}>
                                                <img src={untick} alt="" />
                                            </div>  
                                            )}                                            
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SelectedLanguge;