/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useConstructor } from "../help";
import Bots from "../api/Bots";
import calageIcon from '../assets/calage.svg';
import calageIconNon from '../assets/calageUnselect.svg';
import TikIcon from '../assets/Tik.svg';
import untick from '../assets/unTick.svg';
import hotelIcon from '../assets/hotel.svg';
import fiSearch from '../assets/fi_search.svg';

import { MoonLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Planing = () => {
    const navigate = useNavigate();    
    const [isLoading, setIsLoading] = useState(true);
    const [selectedBox, setSelectedBox] = useState(0);     
    const [searchBox ,setsearchBox] = useState('')  
    const [bots, setBots] = useState<Array<any>>([]);  
    const [filterdBots,setFilterdBots] = useState<Array<any>>([]);    
    const [localApikey, setLocalApikey] = useState('');
    const resolveInconName = (name:string,index:number) => {
        if(selectedBox == index +1) {
            if(name == 'University'){
                return calageIcon
            }
            if(name == 'Hotel') {
                return hotelIcon
            }
        }
        if(name == 'University'){
            return calageIconNon
        }
        if(name == 'Hotel') {
            return hotelIcon
        }        
        return ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const filterSearch = () => {
        if(searchBox != ''){
            setFilterdBots(bots.filter(item => item.title.toLowerCase().includes(searchBox.toLowerCase())))
        }else{
            setFilterdBots(bots)
        }
    }
    useEffect(() => {
        filterSearch()
    },[filterSearch, searchBox])
    const getBotsControled = () => {
        // Bots.getBots(
        // null,
        // res => {
        //     const newob: Array<any> = [];
        //     let keys = [];
        //     keys = Object.keys(res).filter(item => item != 'title' && item != 'sub_title');
        //     setPagetitle(res.title);
        //     setPageSub(res.sub_title)
        //     keys.forEach(item => {
        //     const news = {
        //         title: item,
        //         description: res[item].description,
        //         icon: res[item].icon,
        //         apikey: res[item].apikey,
        //         status: res[item].status,
        //     };
        //     newob.push(news);
        //     });
        //     console.log(newob);
        //     setBots(newob);
        //     setIsLoading(false);
        // },
        // // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // _err => {
        //     console.log('err')
        // },
        // );
        Bots.getCategories((res) => {
            // console.log(res)
            const newob: Array<any> = [];
            setPagetitle(res.title);
            setPageSub(res.sub_title)      
            const keys = Object.keys(res).filter(item => item != 'title' && item != 'sub_title' && item!='Technician'); 
            keys.forEach((item,index) => {
                const news = {
                    title: res[item].title,
                    description: res[item].sub_title,
                    icon: item,
                    key:item
                };
                newob.push(news);
            });      
            // console.log(newob)
            setCategories(newob)          
            setIsLoading(false);
        },()=>{})
    };    
    const [categories,setCategories] = useState<Array<any>>([
        // {
        //     title:'As a university student',
        //     description:'Canterbury Christ Church University',
        //     icon:'University'
        // },
        // {
        //     title:'As a Hotel Passenger',
        //     description:'Hotels',
        //     icon:'Hotel'
        // },
        // {
        //     title:'As a technician',
        //     description:'Companies and Groups',
        //     icon:'Hotel'
        // }        
    ])
    useConstructor(() => {
        getBotsControled()
    })   
    const [stepWork,setStepWork] = useState('plan') 
    const [pageTitle,setPagetitle] = useState("How are you planning to use Codie?")
    const [pageSub,setPageSub] = useState("")
    //     title:'',
    //     sub_title:'We’ll fit the experience to your needs.'
    // })
    return (
        <div style={{backgroundColor:'#121212',width:window.innerWidth,height:window.innerHeight,overflowY:'scroll'}}>
            {isLoading?
                <div style={{width:'100%',height:'100%',backgroundColor:'black',position:'absolute',top:0,opacity:'0.4'}}></div>
            :undefined}
            {isLoading ?
             <div style={{position:'absolute',width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <MoonLoader color="#0c63f0" />
             </div>
             :
             undefined
            }
            <div style={{width:'100%',fontFamily:'Poppins-Meduim',height:'100%',display:'flex',justifyContent:'center'}}>
                {
                    stepWork != 'plan' ?
                          <img onClick={() => {
                            setSelectedBox(0)
                            setStepWork('plan')
                        }} style={{position:'absolute',top:24,left:32,cursor:'pointer'}} src="./icons/leftVector.svg" />
                    :undefined
                }
               
                {
                    stepWork == 'plan' ?
                    <div style={{width: window.innerWidth <600 ? '90%':'unused'}}>
                        <div style={{width:'100%',display:'flex',justifyContent:'center',marginTop: 100,color:'#FFFFFFDE',fontSize:16}}>
                        {pageTitle} 
                        </div>
                        <div style={{marginTop: 8,textAlign:'center',color:'#FFFFFF99',fontSize:12}}>
                            {pageSub}
                        </div>

                        <div className="hiddenScrollBar" style={{height:260,overflowY:'scroll',width:window.innerWidth > 500?'400px':'auto',padding:'16px 8px',borderRadius:4,marginTop: 56}}>
                            {categories.map(((item,index) => {
                                return (
                                    <>
                                    <div  onClick={() => {
                                        // props.setPlan('As a technician');
                                        // setLocalApikey(item.apikey)
                                        setSelectedBox(index+ 1);
                                        setIsLoading(true)
                                        Bots.getBots({category:item.key},(res) =>{
                                            const newob: Array<any> = [];
                                            let keys = [];
                                            keys = Object.keys(res).filter(item => item != 'title' && item != 'sub_title');
                                            setPagetitle(res.title);
                                            setPageSub(res.sub_title)
                                            keys.forEach(item => {
                                            const news = {
                                                title: item,
                                                description: res[item].description,
                                                icon: res[item].icon,
                                                apikey: res[item].apikey,
                                                status: res[item].status,
                                            };
                                            newob.push(news);
                                            });
                                            // console.log(newob);
                                            setBots(newob);
                                            setFilterdBots(newob)
                                            setIsLoading(false);
                                            setStepWork('')
                                            setSelectedBox(0)
                                        },() => {})
                                        // setTimeout(() => {
                                        //     setStepWork('')
                                        // }, 1000);
                                    }} style={{
                                            height: '70px',
                                            marginTop: '8px',
                                        // paddingTop: '8px',
                                        // paddingBottom: '8px',
                                        backgroundColor: '#1F1F1F',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        paddingLeft: 16,
                                        paddingRight: 16,
                                        flexDirection: 'row',
                                        }}>
                                            <div style={{display:'flex',justifyContent:'start',alignItems:'center'}}>
                                                {/* <img src={resolveInconName(item.icon,index)}/> */}
                                                <div style={{marginLeft: 12}}>
                                                    <div
                                                    style={{
                                                        color: '#FFFFFFDE',
                                                        fontSize: 12,
                                                        fontFamily: 'Poppins-Meduim',
                                                    }}>
                                                    {item.title}
                                                    </div>
                                                    <div
                                                    style={{
                                                        fontSize: 10,
                                                        color: '#FFFFFF99',
                                                        marginTop: 4,
                                                    }}>
                                                    {item.description}
                                                    </div>
                                                </div>
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
                            }))}
                        </div>                  
                    </div>
                    :
                    <div style={{width: window.innerWidth <600 ? '90%':'unused'}}>
                        <div style={{width:'100%',display:'flex',justifyContent:'center',marginTop: 100,color:'#FFFFFFDE',fontSize:16}}>
                        {pageTitle} 
                        </div>
                        <div style={{marginTop: 8,textAlign:'center',color:'#FFFFFF99',fontSize:12}}>
                            {pageSub}
                        </div>
                        <div style={{marginTop: 56,paddingLeft: '8px',paddingRight: '8px',overflow:'hidden',backgroundColor:'#2D2D2D',borderTopLeftRadius: '4px',borderTopRightRadius:'4px'}}>
                            <div style={{display:'flex',justifyContent:'start',alignItems:'center',borderBottom:'1px solid #1F1F1F',paddingTop:8,paddingBottom:8}}>
                                <img style={{marginLeft:16}} src={fiSearch} />
                                <input value={searchBox} onChange={(event) =>{
                                    setsearchBox(event.target.value)
                                }} style={{fontSize:12,fontWeight:'300',outline:'none',border:'none',padding:'10px 8px',color:'#FFFFFFDE',backgroundColor:'#2D2D2D',width:'220px'}} placeholder="Search for your faculty" />
                            </div>
                        </div>
                        <div className="hiddenScrollBar" style={{height:260,width:'auto',minWidth:window.innerWidth > 500?'400px':'300px',maxWidth:window.innerWidth > 500?'400px':'100%',overflowY:'scroll',backgroundColor: '#2D2D2D',padding:'16px 8px',borderRadius:'0px 0px 4px 4px'}}>
                        {filterdBots
                            .filter(item => item.title !== 'technician')
                            .map((item: any, index: number) => {
                                return (
                                    <div
                                    onClick={() => {
                                        // props.setPlan('As a technician');
                                        setLocalApikey(item.apikey)
                                        setSelectedBox(index+ 1);
                                    }}
                                    style={{marginTop: 8}}>
                                    <div
                                        style={{
                                        height: '70px',
                                        // paddingTop: '8px',
                                        // paddingBottom: '8px',
                                        backgroundColor: '#1F1F1F',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        paddingRight: '16px',
                                        flexDirection: 'row',
                                        }}>
                                        <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            paddingLeft: '16px',
                                            paddingRight: '16px',
                                        }}>
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
                                            // visibility:'hidden',
                                            backgroundColor: '#FFFFFF61',
                                            minHeight: 24,
                                            minWidth: 24,
                                            borderRadius: 100,
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            }}>
                                            {/* <img src={TikIcon} alt="" /> */}
                                        </div>                                        
                                        )}
                                        {/* <img src={selectedBox==index+1 ? calageIcon :calageIconNon}/> */}
                                        <div style={{marginLeft: 12}}>
                                            <div
                                            style={{
                                                color: '#FFFFFFDE',
                                                fontSize: 12,
                                                fontFamily: 'Poppins-Meduim',
                                            }}>
                                            {item.title}
                                            </div>
                                            <div
                                            style={{
                                                fontSize: 10,
                                                color: '#FFFFFF99',
                                                marginTop: 4,
                                            }}>
                                            {item.description}
                                            </div>
                                        </div>
                                        </div>

                                    </div>
                                    </div>
                                )
                            })}
                        </div>
                        <button
                            disabled={selectedBox === 0}
                            onClick={() => {
                            console.log(localApikey);
                            if (localApikey.length > 1) {
                                // props.setApikey(localApikey);
                                localStorage.setItem('ApiKey',localApikey)
                                navigate('/register')
                                // checkBotId(localApikey).then(a => {
                                // console.log(a);
                                // setTimeout(() => {
                                //     setIsLoading(false);
                                //     if (a.state === true || a.state === false) {
                                //     console.log('start app');
                                //     if (a.lastupdate) {
                                //         props.setLastupdate(a.lastupdate);
                                //     }
                                //     AsyncStorage.setItem('apiKey', localApikey);
                                //     // console.log(props.apiKey);
                                //     props.setMode(a.bottype);
                                //     props.setChatType(a.chat_type);
                                //     if (a.videos.after_question) {
                                //         props.setVideoYurl(a.videos.after_question[0]);
                                //     }
                                //     if (a.videos.before_question) {
                                //         props.setVideoYurl(a.videos.after_question[0]);
                                //     }
                                //     if (a.videos.during_question) {
                                //         props.setVideoXurl(a.videos.during_question[0]);
                                //         props.setAvatarurl(a.videos.during_question[0]);
                                //     }
                                //     }
                                //     props.setChatType(a.chat_type);
                                //     if (a.chat_type !== 'dark_mode') {
                                //     props.setPlan('');
                                //     props.setPage('');
                                //     props.setAcceptBotId(true);
                                //     }
                                // }, 0);
                                // });
                                // AsyncStorage.setItem('botTypeApikey', localApikey);
                            }
                            // props.setShowOnBording(false);
                            }}
                            style={{
                            backgroundColor: '#007BFF',
                            width: '100%',
                            borderRadius: 5,
                            border:'none',
                            height: 50,
                            top: 70,
                            marginTop: '32px',
                            display: 'flex',
                            opacity: selectedBox === 0 ? 0.4 : 1,
                            // position:'absolute',
                            justifyContent: 'center',
                            alignItems: 'center',
                            }}>
                            <div
                            style={{
                                color: 'white',
                                fontSize: 16,
                                fontWeight: '500',
                                fontFamily: 'Poppins-Meduim',
                            }}>
                            Go for next step
                            </div>
                        </button>                    
                    </div>
                }
            </div>
        </div>        
    )
}

export default Planing