/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
// import Aimy from '../assets/aiMy.png';
import {Sugesstions, TypeAndRecord} from "../components"
// import micIcon from '../assets/mic.svg';
import useSpeechToText from "react-hook-speech-to-text";
import { useConstructor } from "../help";
import makeid from '../Hoc/RandomKey';
import Flow from "../api/Flow";
import { BeatLoader } from "react-spinners";
// import { useNavigate } from "react-router-dom";
import { checkBotId } from "../api/botId";
// import logOutIcon from '../assets/fi_log-out.svg';
// import keybordIcon from '../assets/keyboard.svg';
// import SettingIcon from '../assets/setting.svg';
// import SendIcon from '../assets/Send.svg';
// import translateIcon from '../assets/translate.svg';
// import LogOutIcom from '../assets/logOut.svg';
import { toast } from "react-toastify";
import { Setting } from "../Acord";
// import Rate from "../api/Rate";


const ResumeChat2 = () => {
    const [boxWidth,setBoxWidth] = useState(window.innerWidth);
    const [showSetting, setShowSetting] = useState(false);    
    const [boxHeight,setBoxHeight] = useState(window.innerHeight);
    const videoRef = useRef<any>();
    const [videourl,setvideourl] = useState('./images/02.mp4')    
    const [audioUrl, setAudioUrl] = useState<string>('');
    const audioRef = useRef<any>()      
    const [isTalking, setIsTalking] = useState(false);    
    const [isLoading, setIsLoading] = useState(false);
    const [useApikey, setApiKey] = useState('');
    const BLokedIdList =useRef<string[]>([]);
    // const [_showSetting,setShowSetting] = useState(false);
    const [_showLangs,setShowLangs] = useState(false);
    useEffect(() => {
        if(videoRef.current ){
            const refren = videoRef.current  as any   
            // setShowOpacity(true)
            refren.load()
        }        
    })    
    useEffect(() => {
        if(isTalking){
            setvideourl('./images/01.mp4')
        }else{
            setvideourl('./images/02.mp4')
        }
    })
    // const _lnguages = [
    //   {lan: 'English', code: 'en-US'},
    //   {lan: 'German', code: 'de'},
    //   {lan: 'French', code: 'fr'},
    //   {lan: 'Persian', code: 'fa'},
    //   {lan: 'Turkish', code: '	tu'},
    //   {lan: 'Chinese', code: 'zh-cn'},
    //   {lan: 'Arabic', code: 'ar-AE'},
    // ];    
    const [selectedLangCode, _setSelectedlangCode] = useState({
      lan: 'English',
      code: 'en-US',
    });    
    // const [showTextBox,setShowTextBox] = useState(false);
    // const [text,setText] = useState('');
    // const [showSetting,setShowSetting] = useState(false);
    const {
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText
    } = useSpeechToText({
        continuous:window.innerWidth < 500 ? true: false,
        crossBrowser: true,
        timeout:9000,
        googleCloudRecognitionConfig: {
          languageCode: selectedLangCode.code
        },        
        googleApiKey: 'AIzaSyB904oDQEZb5M1vdJYxVhXOtU3_URla1Nk',
        // speechRecognitionProperties: { interimResults: true },
        useLegacyResults: false
    });  
    // const closeFilter = (event:any) => {
    //   // console.log(event.path[0].id )
    //   let paths = []
    //   paths = event.path.map((item:HTMLElement) => item.id)
    //   // if(event.path[0].id =='sellguru-newBoardModal' ){
    //     // console.log(paths)
    //   if(!paths.includes('langModal') && !paths.includes('langModal-button')){
    //     // setOpenNicheKeywords(false)
    //     document.removeEventListener('click',closeFilter);
    //     // document.getElementById('sellguru-modaloverly').style.display = 'none'
    //   }
    // }        
    // const [showSugestions, setShowSuggestions] = useState(false);    
    const [chat, setChat] = useState<Array<any>>([]);   
    const [showSugestion,setShowSuggestion] = useState(false); 
    // const [openRate,setOpenRate] = useState(false)
    const sendToApi =() => {
      const adminChats = chat.filter(item => item.from === 'admin');
      const chats:Array<any> = chat
      if(results.length>0){    
          if(!chats.map(item => item.timestamp).includes(results.map((item:any) => item.timestamp)[results.length -1])){
          // setShowAskTosend(true)
              if(results.map((item:any) => item.timestamp)[results.length -1] != chats[chats.length-1]?.timestamp){
               if(results.map((item:any) => item.transcript)[results.length -1]!= ''){
                  const newChat = {
                    type: 'text',
                    like:null,
                    message: results.map((item:any) => item.transcript)[results.length -1],
                    from: 'user',
                    timestamp:results.map((item:any) => item.timestamp)[results.length -1],
                    message_key: makeid(15),
                    question: results.map((item:any) => item.transcript)[results.length -1],
                    weekDay: new Date().getDay(),
                    month: new Date().getMonth(),
                    day: new Date().getDate(),
                  };
                  chats.push(newChat)
                  setChat(chats);
                  setIsLoading(true);
                  pageScroll()      
                  Flow.chat(
                    {
                      text: newChat.message,
                      language: selectedLangCode.lan,
                      message_key: newChat.message_key,
                      apikey: useApikey,
                      getcurrentconvesationid:
                        adminChats.length > 0
                          ? adminChats[adminChats.length - 1].currentconverationid
                          : 1,
                    }                  
                  ).then(res => {
                    if(res.answer){
                        if(!BLokedIdList.current.includes(res.message_key as never)){
                          const responseApi = {
                            type: 'text',
                            message: res.answer.answer,
                            from: 'admin',
                            video: res.answer.video_file,
                            audio: res.answer.audio_file,
                            question: newChat.message,
                            currentconverationid: res.currentconverationid,
                            weekDay: new Date().getDay(),
                            month: new Date().getMonth(),
                            day: new Date().getDate(),
                            aisles:
                              res.answer.suggestion_list !== 'NA'
                                ? res.answer.suggestion_list
                                : [],
                            instanceid: res.instanceid,
                            // aisles:JSON.parse(res.suggestion_list),
                          };
                          chats.push(responseApi)
                          setAudioUrl(responseApi.audio)
                          setIsTalking(true);
                          setChat(chats)
                          localStorage.setItem('catchChats',JSON.stringify(chats))        
                          pageScroll()           
                        }
                    }else{
                      toast.warning('I did not understand your question, ask your question again',{theme:'colored'})
                      // alert('I did not understand your question, ask your question again')
                    }
                    // console.log(res);
                    setIsLoading(false);
                  }).catch(() => {
                     toast.error('Network Connection Error, Please Check Your Connection',{theme:'colored'})
                    setIsLoading(false)
                  })
               }
              }
          }

      }  
    }    
    // const navigate = useNavigate();    
    const pageScroll = () => {
        const el = document.getElementById('chatMessageScrool')
        if(el) {
          el.scrollTop = el?.scrollHeight
        }
        document.getElementById('loader')?.scrollIntoView({behavior:'smooth'});
        // setTimeout(pageScroll,2);
    }     
    // const handleStop = (id: string) => {
    //   setIsLoading(false);
    //   const newChats = chat;
    //   newChats.pop();
    //   setChat(newChats);
    //   BLokedIdList.current = [...BLokedIdList.current, id];
    // };    
    const _handleOfferClick = (offer: string) => {
      // console.log(offer.substring(0, 6));
      setAudioUrl('')
      setIsTalking(false)
      setShowSuggestion(false)
      // setShowSuggestions(false);
      const adminChats = chat.filter(item => item.from === 'admin');
      const newChat = {
        type: 'text',
        message: offer,
        from: 'user',
        question: offer,
        message_key: makeid(15),
        weekDay: new Date().getDay(),
        month: new Date().getMonth(),
        day: new Date().getDate(),
      };
      // setLastChat(newChat);
      chat.push(newChat);
      setChat(chat);
      setTimeout(async () => {
          setIsLoading(true);
          pageScroll()
          Flow.chat(
            {
              text: offer,
              language: selectedLangCode.lan,
              message_key: newChat.message_key,
              apikey: useApikey,
              getcurrentconvesationid:
                adminChats.length > 0
                  ? adminChats[adminChats.length - 1].currentconverationid
                  : 1,
            }
          ).then(async (res: any) => {
              if(res.answer ) {
                if(!BLokedIdList.current.includes(res.message_key as never)){
                  const responseApi = {
                    type: 'text',
                    message: res.answer.answer,
                    from: 'admin',
                    video: res.answer.video_file,
                    audio: res.answer.audio_file,
                    question: '',
                    currentconverationid: res.currentconverationid,
                    weekDay: new Date().getDay(),
                    month: new Date().getMonth(),
                    day: new Date().getDate(),
                    aisles:
                      res.answer.suggestion_list !== 'NA'
                        ? res.answer.suggestion_list
                        : [],
                    instanceid: res.instanceid,
                    like:null,
                    // aisles:JSON.parse(res.suggestion_list),
                  };
                  chat.push(responseApi);
                  setChat(chat);
                  setAudioUrl(responseApi.audio)
                  setIsTalking(true);
                  setChat(chat)     
                  localStorage.setItem('catchChats',JSON.stringify(chat))              
                  // console.log(res);
                  pageScroll()
                }
              }else{
                toast.warning('I did not understand your question, ask your question again',{theme:'colored'})
                // alert('I did not understand your question, ask your question again')
              }
              setIsLoading(false);              
              // await AsyncStorage.setItem('chatsCash' + useApikey, JSON.stringify(chat));
          }).catch(() => {
            toast.error('Network Connection Error, Please Check Your Connection',{theme:'colored'})
            setIsLoading(false)
          });

      }, 1);
    };       
    useEffect(() => {
      if(!isRecording){
          console.log('try send')
          sendToApi()
      }      
      if(isLoading) {
        pageScroll()
      }
      if(audioRef.current){
          const refren = audioRef.current  as any   
          refren.load()
      }   
      // if(document.getElementById('chatMessageScrool1')){
      //     setTimeout(function() {
      //         pageScroll()
      //     }, 5000);   
      // }              
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
    // const _test = () => {
    //   localStorage.setItem('accessToken','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlODkwOTgxZjg4IiwiaWF0IjoxNjk0NzY5MTU3LCJuYmYiOjE2OTQ3NjkxNTcsImp0aSI6ImYxN2ExMGFlLWM3OTMtNDMzNi05YjVlLWRlM2UyMTZjOTUyYyIsImV4cCI6MTY5NTM3Mzk1NywidHlwZSI6ImFjY2VzcyIsImZyZXNoIjpmYWxzZX0.Pop49RJ02EkXd1PchcQaoGJC02r-wM69cHZCIsbRP1s')
    // }
    const [suglist,setSuglist] = useState<Array<any>>([]);
    const closeFilter = (event:any) => {
        console.log(event.composedPath()[0].id)
        let paths = []
        paths = event.composedPath().map((item:HTMLElement) => item.id)
        console.log(paths)
        // id="settingBox"
        if(!paths.includes('boxInput')&& !paths.includes("settingButton")&& !paths.includes("settingBox") && !paths.includes("LangBox")  && !paths.includes('boxInput-button') && !paths.includes('settingButton') && !paths.includes('setting')){
            // setShowTextBox(false);
            // setShowSetting(false)
            setShowSetting(false)
            setShowLangs(false)
            document.removeEventListener('click',closeFilter);
        }
    }    
    useConstructor(() => {
      // _test()
      localStorage.setItem("accessToken",'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlZDgwMmZmMzFhIiwiaWF0IjoxNjk5NzYzODk4LCJuYmYiOjE2OTk3NjM4OTgsImp0aSI6ImI2YTYxNGNlLWY1ZWYtNDQ0ZS04ZDJkLTVkYTk2MGEyOWM4ZCIsImV4cCI6MjQ3NzM2Mzg5OCwidHlwZSI6ImFjY2VzcyIsImZyZXNoIjpmYWxzZX0.3xZr9feGtVsxuLpOrfE_Z5vlDRMCpURGog4i7jmco5s')
      localStorage.setItem("ApiKey",'0e218a19f41b4eb689003fa634889a19')
      // if(localStorage.getItem('catchChats')){
      //   const data:string = localStorage.getItem('catchChats') as string
      //   setChat(JSON.parse(data));
      // }

      if(!localStorage.getItem('accessToken')){
        // setTimeout(() => {
        //   navigate('/plan');
        // }, 200);
      }
      if(!localStorage.getItem('ApiKey')){
        // setTimeout(() => {
        //   navigate('/plan');
        // }, 200);
      }      
      setTimeout(() => {
        setShowSuggestion(true)
      }, 500);
      if(localStorage.getItem('ApiKey')!= null){
        setApiKey(localStorage.getItem('ApiKey') as string)
        checkBotId(localStorage.getItem('ApiKey') as string).then(res => {
         const listsSug:Array<any> =[]
          res.suggestion_list.forEach((element:string) => {
            listsSug.push({
              text:element
            })
          });
          setAudioUrl(res.introduction_voice)
          setIsTalking(true)
          setSuglist(listsSug);
          // console.log(res)
        })        
      }
    })
    const [_showExitModal,setShowExitModal] = useState(false);
    const settingRef = useRef<HTMLDivElement>(null);
    
    return (
        <>
         <div className="hiddenScrollBar" style={{backgroundColor:'white',position:'relative',width:boxWidth,height:boxHeight,overflowY:'scroll'}}>
            {/* <div style={{backgroundColor:'#253343',overflowY:'visible',position:'relative',top:'0px',height:'187px',width:'100%'}}>
                <div style={{backgroundColor:'#FECA06',display:'flex',justifyContent:'center',alignItems:'start',width:'32px',height:'143px',position:'absolute',bottom:'0px',left:'16px'}}>
                    <div>
                        <img style={{marginTop:'8px'}} src="./icons/Vector.svg" alt="" />
                        <img style={{marginTop:'8px'}} src="./icons/call.svg" alt="" />
                        <img style={{marginTop:'8px'}} src="./icons/global.svg" alt="" />
                        <img style={{marginTop:'8px'}} src="./icons/linkedin.svg" alt="" />
                    </div>
                </div>
                <div style={{position:'absolute',bottom:'0px',left:'48px',paddingLeft:'16px',height:'143px'}}>
                    <div style={{color:'white' ,fontSize:'12px',marginTop:'8px'}}>
                        Azami@codie.ai
                    </div>
                    <div style={{color:'white' ,fontSize:'12px',marginTop:'10px'}}>
                        +44 (788)29 59 722
                    </div>
                    <div style={{color:'white' ,fontSize:'12px',marginTop:'10px'}}>
                        codie.ai
                    </div>
                    <div style={{color:'white' ,fontSize:'12px',marginTop:'10px'}}>
                        LinkedIn
                    </div>                                                            
                </div>
                <div style={{position:'absolute',right:'0px',top:'60px'}}>
                    <div style={{backgroundColor:'#FECA06',width:'150px',textAlign:'center',color:'#253343',fontSize:'13px',fontWeight:'600'}}>Dr. Farzin Azami</div>
                    <div style={{color:'white',fontSize:'12px',textAlign:'center',marginTop:'8px',fontWeight:'500'}}>CoFounder and CEO</div>
                </div>
            </div> */}
            {/* <Setting 
                onChangeLanguage={() => {}}
                onClearHistory={() => {}}
                onLogout={() => {}}
                settingRef={settingRef}
            ></Setting> */}
            {showSetting && (
              <Setting
                settingRef={settingRef}
                onChangeLanguage={(lan) => {
                  _setSelectedlangCode(lan)
                  const newChats:Array<any> = []
                  setChat(newChats)
                }}
                onClearHistory={() => {
                  // localStorage.removeItem('chats')
                  const newChats:Array<any> = []
                  setChat(newChats)
                }}
                onLogout={() => {}}
              />
            )}
            {/* <div className="Acord-Setting-logoutIcon " /> */}
            {/* <div
              onClick={() => {
                setShowSetting((prev) => !prev);
                setAudioUrl('')
                setIsTalking(false)
              }}
              className='settingIcon'
              style={{zIndex:50}}
            />             */}
            <img onClick={() => {
                setShowSetting((prev) => !prev);
                setAudioUrl('')
                setIsTalking(false)
              }}
              className='settingIcon'
              style={{zIndex:50}} src="./Acord/setting.svg" alt="" />
            <div style={{display:'flex',zIndex:20,top:20,justifyContent:'center',width:'100%',position:'absolute'}}>
                <video id="dragAbleAi" ref={videoRef} height={'138px'} style={{borderRadius:'100%'}} className="pk_video" preload="auto" width={'138px'} autoPlay loop muted >
                    <source id="videoPlayer" key={videourl}  src={videourl} type="video/mp4"></source>
                </video> 
                {/* <video autoPlay style={{borderRadius:'100%',width:'138px',height:'100%',border:'2px solid white'}} src="./images/01.mp4"></video> */}
                {/* <img src="./images/user.png" style={{width:'138px',height:'138px',borderRadius:'100%'}} /> */}
            </div>

            {!isRecording && showSugestion && chat.length ==0 ?
              <div style={{ 
                position: 'absolute',
                width: '-webkit-fill-available',
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'row',
                top: 260,
                justifyContent: 'center',
                zIndex: 15,              
              }}>
                <Sugesstions close={() => {
                  setIsTalking(false)
                  setAudioUrl('')
                  setShowSuggestion(false)
                }} sugges={suglist} dark handleOfferClick={_handleOfferClick}></Sugesstions>    
              </div>
             :undefined}
             <div style={{display:'flex',width:'100%',position:'absolute',top:'200px',zIndex:12,justifyContent:'center'}}>
               <div style={{backgroundColor:'#EBEBEB',maxWidth:'432px',width:'100%',minHeight:'215px',paddingBottom:'16px',maxHeight:'315px',position:'relative'}}>
                  <div style={{backgroundColor:'#FBAD37',zIndex:2,width:'102px',height:'45px',position:'absolute',left:'0px',top:40}}></div>
                  <div style={{backgroundColor:'#253343',zIndex:1,width:'3px',height:'156px',position:'absolute',left:'66px',top:0}}></div>
                  <div style={{color:'#253343',fontSize:'22px',fontWeight:400,marginTop:'34px',fontFamily:'Poppins-Regular',marginLeft:'120px'}}>
                    <div style={{whiteSpace:'pre-line',width:'40px',lineHeight:'27px'}}>Farzin Azami</div>
                  </div>
                  <div style={{display:'flex',justifyContent:'start',alignItems:'center'}}>
                    <div style={{color:'#445A74',fontSize:'16px',width:'500px',fontFamily:'Poppins-Regular',marginLeft:'120px'}}>Founder of Codie</div>
                    <div style={{backgroundColor:'#445A74',width:'-webkit-fill-available',height:4,right:'0px'}}></div>
                  </div>
                  <div style={{width:'100%',display:'flex',justifyContent:'end'}}>
                    <div>
                      <div onClick={() => {
                        window.open('https://www.Codie.ai')
                      }} style={{display:'flex',justifyContent:'start',marginRight:24}}>
                        <img style={{width:'16px'}}  src="./global.svg" alt="" />
                        <div style={{color:'#253343',marginLeft:'8px',textDecoration:'underline',cursor:'pointer',fontSize:'12px',fontFamily:'Poppins-Regular'}}>www.Codie.ai</div>
                      </div>
                      <div style={{display:'flex',justifyContent:'start',marginTop:'4px',marginRight:24}}>
                        <img src="./call.svg" alt="" />
                        <div style={{color:'#253343',marginLeft:'8px',cursor:'pointer',fontSize:'12px',fontFamily:'Poppins-Regular'}}>07882959722</div>
                      </div>
                      <div onClick={() => {
                        window.open("mailto:Azami@codie.ai?cc=&subject=");
                      }} style={{display:'flex',justifyContent:'start',marginTop:'4px',marginRight:24}}>
                        <img  src="./email.svg" alt="" />
                        <div style={{color:'#253343',marginLeft:'8px',textDecoration:'underline',cursor:'pointer',fontSize:'12px',fontFamily:'Poppins-Regular'}}>Azami@codie.ai</div>
                      </div>
                      <div style={{display:'flex',justifyContent:'start',marginTop:'4px',marginRight:24}}>
                        <img src="./linkdin.svg" alt="" />
                        <div style={{color:'#253343',marginLeft:'8px',cursor:'pointer',fontSize:'12px',fontFamily:'Poppins-Regular'}}>Linkedin</div>
                      </div>                                                                  
                    </div>
                  </div>
               </div>
             </div>

            <div id="chatMessageScrool" className="hiddenScrollBar" style={{height:140,display:'flex',justifyContent:'center',width:'100%',marginTop:420,overflowY:'scroll'}}>
              <div style={{width:'100%'}}>
                {
                  chat.map((item:any,index:number) => {
                    return (
                      <>
                        <div id={"chatitem"+index}>
                          {item.from == 'user' ?
                                    <div
                                      style={{
                                        width: '90%',
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        marginBottom: 32,
                                      }}>
                                      <div
                                        style={{
                                          maxWidth: '100%',
                                          minWidth: '100%',
                                        }}>
                                        <div
                                          style={{
                                            color: '#363636',
                                            // lineHeight: 24,
                                            paddingLeft: 16,
                                            fontSize: 16,
                                            fontFamily: 'Poppins-Regular',
                                            fontWeight: '400',
                                          }}>
                                          {item.question}
                                        </div>
                                      </div>
                                    </div>
                          :
                          <>
                            <div
                              style={{
                                // width: '100%',
                                display: 'flex',
                                alignItems: 'flex-end',
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                backgroundColor: '#dedede',
                                borderRadius: 4,
                                paddingTop: 10,
                                paddingBottom: 16,
                                paddingLeft: 16,
                                paddingRight: 16,
                                marginBottom: 50,
                              }}>
                              <div style={{width: '98%'}}>
                                <div
                                  style={{
                                    color: '#242323',
                                    // lineHeight: 24,
                                    fontSize: 16,
                                    fontFamily: 'Poppins-Regular',
                                    fontWeight: '400',
                                  }}>
                                  {item.message}
                                </div>
                                {/* <div style={{display:'flex',justifyContent:'end',width:'100%'}}>
                                  <div style={{cursor:'pointer'}}>
                                    <img src="./icons/like.svg" alt="" />
                                  </div>
                                  <div style={{marginLeft: 8,cursor:'pointer'}}>
                                    <img style={{transform:'rotate(180deg)'}} src="./icons/like.svg" alt="" />
                                  </div>                                  
                                </div> */}
                              </div>
                            </div>                        
                          </>}                  
                        </div>
                      </>
                    )
                  } )
                }
                {isLoading ? (
                    <div
                      id="loader"
                      style={{
                        // width: '100%',
                        height: 40,
                        backgroundColor: '#dedede',
                        borderRadius: 4,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft: 18,
                        paddingRight: 20,
                        justifyContent: 'center',
                      }}>
                      <div>
                        <BeatLoader size={10}  color="#404040" />
                      </div>
                      {/* <div onClick={() => {
                        handleStop(chat[chat.length -1].message_key)
                      }} style={{color: '#007BFF',
                                  fontSize: 14,
                                  cursor:'pointer',
                                  fontWeight: '500',
                                  fontFamily: 'Poppins-Regular',}}>
                        Stop
                      </div> */}
                    </div>
                ) : undefined}      
              </div>
            </div>
            <div
              style={{
                width: '100%',
                position: 'absolute',
                bottom: 50,
                display: 'flex',
                justifyContent:'center',
                // padding: '0px 16px',
                alignItems: 'center',
              }}>
              {/* {!showSugestions && interimResult === undefined && chat.length === 0 ? (
                <div
                  style={{
                    color: 'white',
                    fontWeight: '500',
                    marginBottom: 50,
                    paddingLeft: 8,
                    paddingRight: 8,
                    textAlign: 'center',
                    fontFamily: 'Poppins-Regular',
                    fontSize: 15.5,
                  }}>
                  To start chatting, simply select either the voice recording
                  button or the keyboard option
                </div>
              ) : undefined} */}
            </div>


            <div
              style={{
                width: '100%',
                position: 'absolute',
                bottom: 50,
                display: 'flex',
                justifyContent:'center',
                // padding: '0px 16px',
                alignItems: 'center',
              }}>
              {
                  interimResult?  
                  <div
                    style={{
                      color: 'white',
                      fontWeight: '500',
                      marginBottom: 50,
                      paddingLeft: 8,
                      paddingRight: 8,
                      textAlign: 'center',
                      fontFamily: 'Poppins-Regular',
                      fontSize: 15.5,
                    }}>
                    {interimResult}
                  </div>
                  :undefined
              }
                
            </div>
            {/* <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
              {showTextBox ? 
                <div id="boxInput" style={{position:'absolute',border:'none',outline:'none',width:'90%',bottom:24 ,height: 50,display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <input value={text} onChange={(event) => setText(event.target.value)} style={{width:'100%',height:37,borderRadius:8,backgroundColor:'#2D2D2D',padding:'0px 12px',paddingRight:40,color:'white',fontFamily:'poppins-Regular'}} />
                  <img onClick={() => {
                    setShowTextBox(false);
                    if(text.length > 0){
                      _handleOfferClick(text)
                    }
                    setText('')
                  }} style={{position:'absolute',zIndex:20,right:10}} src={SendIcon} />
                </div>
              :
                <div style={{position:'absolute',width:'90%',bottom:24 ,height: 50,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <button id="settingButton" onClick={() => {
                      setShowSetting(!showSetting)
                      document.addEventListener('click',closeFilter)
                      setAudioUrl('')
                      setIsTalking(false)
                    }} style={{width:56,height: 56,border:'solid 1px white',backgroundColor:'#121212',display:'flex',justifyContent:'center',cursor:'pointer',alignItems:'center',borderRadius:'100%'}}>
                      <img src={SettingIcon} />
                    </button>
                    {showSetting ?
                      <div id="setting" style={{backgroundColor:'#353535',padding:'12px 16px',position:'absolute',top:-60,borderRadius:5}}>
                        <div onClick={() => {
                          setIsTalking(false);
                          setAudioUrl('');
                          setShowExitModal(true);
                        }} style={{display:'flex',width:'100%'}}>
                          <img style={{marginRight:8}} src={LogOutIcom} />
                          <div style={{color:'#FFFFFFDE',cursor:'pointer'}}>Log out</div>
                        </div>                      
                      </div>
                    :undefined}
                    <button disabled={isLoading} onClick={isRecording?() => {
                      stopSpeechToText()
                      setAudioUrl('');
                      setIsTalking(false)
                      sendToApi()   
                      pageScroll()
                    }:() => {
                      startSpeechToText()
                      setAudioUrl('');
                      setIsTalking(false)
                      sendToApi()     
                      pageScroll()                    
                    }} style={{width:isRecording? 66: 56,height:isRecording? 66: 56,border:'none',backgroundColor:'#007BFF',display:'flex',justifyContent:'center',cursor:'pointer',alignItems:'center',borderRadius:'100%'}}>
                        <img style={{width:isRecording? 35: 30}} src={micIcon} />
                    </button>
                    <button id="boxInput-button" onClick={() => {
                      setShowTextBox(true);
                      setAudioUrl('');
                      setIsTalking(false)
                      document.addEventListener('click',closeFilter)
                    }} style={{width:56,height: 56,border:'solid 1px white',backgroundColor:'#121212',display:'flex',justifyContent:'center',cursor:'pointer',alignItems:'center',borderRadius:'100%'}}>
                      <img src={keybordIcon} />
                    </button>
                </div>
              }
            </div> */}
            {/* {chat.length > 0  && chat[chat.length -1].aisles ?
              <div style={{width:'100%',position:'absolute',bottom:88,display:'flex',justifyContent:'center'}}>
                <div style={{width:'90%',display:'flex',justifyContent:'end'}}>
                    <HintComponent isTalking={isTalking} isloading={isLoading} instanceId={chat.filter(item => item.from =='admin')[chat.filter(item => item.from =='admin').length -1].instanceid} send={(text:string) => {
                      setAudioUrl('');
                      setIsTalking(false)
                      _handleOfferClick(text)
                    }}></HintComponent>

                </div>
              </div>
            :undefined} */}
            {/* new type */}
            <TypeAndRecord isTalking={isTalking} setIsTalking={setIsTalking} onstart={() => {
              startSpeechToText()
              setAudioUrl('');
              setIsTalking(false)
              sendToApi()     
              pageScroll()                
            }}
            isLoading={isLoading}
            setShowSugestions={setShowSuggestion}
            logout={() => {
              setShowExitModal(true)
            }}
            onStop={() => {
              stopSpeechToText()
              setAudioUrl('');
              setIsTalking(false)
              sendToApi()   
              pageScroll()             
            }}
             isRecording={isRecording} _handleOfferClick={_handleOfferClick}></TypeAndRecord>
         </div>
          {/* {
            showExitModal ?
            <>
              <div style={{width:'100%',height:'100%',backgroundColor:'black',position:'absolute',top:0,zIndex: 20,opacity:'0.6'}}></div>
              <div style={{width:'100%',zIndex:21,height:'100vh',position:'absolute',display:'flex',justifyContent:'center',alignItems:'center',top:0,left:0}}>
                <div style={{width:'320px',borderRadius:15,backgroundColor:'#121212',height:163,display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <div>
                    <div style={{color:'#FFFFFFDE',fontSize:16,textAlign:'center',fontWeight:400}}>Are you sure you want to exit?</div>
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:32}}>
                      <div onClick={() => {
                        if(localStorage.getItem("has_rated") == 'true') {
                          setOpenRate(true)
                        }else{
                          navigate('/plan')   
                          localStorage.clear()
                        }
                        setShowExitModal(false)
                        // navigate('/plan')
                      }} style={{color:'#007BFF',fontFamily:'Poppins-Meduim',fontSize:'16px',cursor:'pointer'}}>Confirm</div>
                      <div onClick={() => setShowExitModal(false)} style={{color:'#007BFF',fontFamily:'Poppins-Meduim',fontSize:'16px',marginLeft:'32px',cursor:'pointer'}}>Cancel</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
            :undefined
          } */}
          {/* {window.innerWidth < 520 ?
            <div onClick={() => setShowExitModal(true)} style={{position:'absolute',top:16 ,right:32}}>
              <img style={{width:24}} src={logOutIcon} alt="" />
            </div>
          :undefined} */}
          <div style={{visibility:'hidden',top:0,left:0,position:'absolute',width:'0px',height:'0px'}}>
              <div style={{position:'absolute',zIndex:300}}>
              <audio ref={audioRef} controls onEnded={() => {
                  setAudioUrl('')
                  setIsTalking(false)
                  // props.setVideoEnded(true)
                  // console.log('end')
                  // setvideourl(avatar=='ava1'?'https://codieappstorage.blob.core.windows.net/codievoice/Videos/V2_.mp4':'https://codieappstorage.blob.core.windows.net/codievoice/Videos/V1_.mp4')
                  // props.setIsplaying(false)
              }} autoPlay={isTalking &&!isRecording}>
                  <source id="audioPlayer" src={audioUrl} type="audio/mpeg"/>
              </audio>
              </div>             
          </div>      
          {/* {
            openRate ?
              <>
                <div style={{width:'100%',zIndex:20,height:'100vh',position:'absolute',alignItems:'center',display:'flex',justifyContent:'center'}}>
                  <RateComponent onclose={() => {
                    setOpenRate(false)
                    localStorage.clear()
                    navigate('/plan')
                    }} onSubmit={(rate) => {
                      setOpenRate(false)
                      Rate.record({rate:rate})   
                      setTimeout(() => {
                        navigate('/plan') 
                        localStorage.clear()
                      }, 300);
                                       
                    }}></RateComponent>
                </div>
                <div style={{width:'100%',height:'100vh',backgroundColor:'#121212',opacity:'70%',position:'absolute'}}></div>
              </>
            :undefined
          }      */}
        </>
    )
}
export default ResumeChat2