/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useConstructor } from "../help";
import Bots from "../api/Bots";
// import calageIcon from '../assets/calage.svg';
// import calageIconNon from '../assets/calageUnselect.svg';
import TikIcon from '../assets/Tik.svg';
import { MoonLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Planing = () => {
    const navigate = useNavigate();    
    const [isLoading, setIsLoading] = useState(true);
    const [selectedBox, setSelectedBox] = useState(0);        
    const [bots, setBots] = useState<Array<any>>([]);    
    const [localApikey, setLocalApikey] = useState('');
    const getBotsControled = () => {
        Bots.getBots(
        null,
        res => {
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
            console.log(newob);
            setBots(newob);
            setIsLoading(false);
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _err => {
            console.log('err')
        },
        );
    };    
    useConstructor(() => {
        getBotsControled()
    })    
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
                <div style={{width: window.innerWidth <600 ? '90%':'unused'}}>
                    <div style={{width:'100%',display:'flex',justifyContent:'center',marginTop: 100,color:'#FFFFFFDE',fontSize:16}}>
                       {pageTitle} 
                    </div>
                    <div style={{marginTop: 8,textAlign:'center',color:'#FFFFFF99',fontSize:12}}>
                        {pageSub}
                    </div>

                    <div className="hiddenScrollBar" style={{height:260,overflowY:'scroll',backgroundColor: '#2D2D2D',padding:'16px 8px',borderRadius:4,marginTop: 56}}>
                    {bots
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
                                        width: 24,
                                        height: 24,
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
            </div>
        </div>        
    )
}

export default Planing