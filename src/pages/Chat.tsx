/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import {WaveVoice,ImageSpinner, Sugesstions, RateComponent, TypeAndRecord, HintComponent} from "../components"
// import micIcon from '../assets/mic.svg';
import useSpeechToText from "react-hook-speech-to-text";
import { useConstructor } from "../help";
import makeid from '../Hoc/RandomKey';
import Flow from "../api/Flow";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { checkBotId } from "../api/botId";
import logOutIcon from '../assets/fi_log-out.svg';
// import keybordIcon from '../assets/keyboard.svg';
// import SettingIcon from '../assets/setting.svg';
// import SendIcon from '../assets/Send.svg';
// import translateIcon from '../assets/translate.svg';
// import LogOutIcom from '../assets/logOut.svg';
import { toast } from "react-toastify";
import Rate from "../api/Rate";


const Chat = () => {
    const [boxWidth,setBoxWidth] = useState(window.innerWidth);
    const [boxHeight,setBoxHeight] = useState(window.innerHeight);
    const [isSilent,setIsSilent] = useState(true);
    const [audioUrl, setAudioUrl] = useState<string>('');
    const audioRef = useRef<any>()      
    const [isTalking, setIsTalking] = useState(false);    
    const [isLoading, setIsLoading] = useState(false);
    const [useApikey, setApiKey] = useState('');
    const BLokedIdList =useRef<string[]>([]);
    const [showSetting,setShowSetting] = useState(false);
    const [showLangs,setShowLangs] = useState(false);

    const lnguages = [
      {lan: 'English', code: 'en-US'},
      {lan: 'German', code: 'de'},
      {lan: 'French', code: 'fr'},
      {lan: 'Persian', code: 'fa'},
      {lan: 'Turkish', code: 'tr-TR'},
      {lan: 'Chinese', code: 'zh-cn'},
      {lan: 'Arabic', code: 'ar-AE'},
    ];    
    const [selectedLangCode, setSelectedlangCode] = useState({
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
        speechRecognitionProperties:{
          lang:selectedLangCode.code
        },
        // googleCloudRecognitionConfig: {
        //   languageCode: 'tr-TR'
        // },        
        // googleApiKey: 'AIzaSyB904oDQEZb5M1vdJYxVhXOtU3_URla1Nk',
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
    const [openRate,setOpenRate] = useState(false)
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
                      is_silent: isSilent? false:true,
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
                          if(responseApi.audio){
                            setAudioUrl(responseApi.audio)
                            setIsTalking(true);
                          }
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
    const navigate = useNavigate();    
    const pageScroll = () => {
        const el = document.getElementById('chatMessageScrool')
        if(el) {
          el.scrollTop = el?.scrollHeight
        }
        document.getElementById('loader')?.scrollIntoView({behavior:'smooth'});
        // setTimeout(pageScroll,2);
    }     
    const handleStop = (id: string) => {
      setIsLoading(false);
      const newChats = chat;
      newChats.pop();
      setChat(newChats);
      BLokedIdList.current = [...BLokedIdList.current, id];
    };    
    const _handleOfferClick = (offer: string) => {
      // console.log(offer.substring(0, 6));
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
              is_silent: isSilent? false:true,
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
                  if(responseApi.audio){
                    setAudioUrl(responseApi.audio)
                    setIsTalking(true);
                  }                  
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
      if(localStorage.getItem('catchChats')){
        const data:string = localStorage.getItem('catchChats') as string
        setChat(JSON.parse(data));
      }

      if(!localStorage.getItem('accessToken')){
        setTimeout(() => {
          navigate('/plan');
        }, 200);
      }
      if(!localStorage.getItem('ApiKey')){
        setTimeout(() => {
          navigate('/plan');
        }, 200);
      }      
      setTimeout(() => {
        setShowSuggestion(true)
      }, 1500);
      if(localStorage.getItem('ApiKey')!= null){
        setApiKey(localStorage.getItem('ApiKey') as string)
        checkBotId(localStorage.getItem('ApiKey') as string).then(res => {
         const listsSug:Array<any> =[]
          res.suggestion_list.forEach((element:string) => {
            listsSug.push({
              text:element
            })
          });
          setSuglist(listsSug);
          // console.log(res)
        })        
      }
    })
    const [showExitModal,setShowExitModal] = useState(false);
    return (
        <>
         <div className="hiddenScrollBar" style={{backgroundColor:'#121212',position:'relative',width:boxWidth,height:boxHeight,overflowY:'scroll'}}>
            <div style={{marginTop: 50,maxHeight:80,minHeight:80,display:'flex',justifyContent:'center',alignItems:'center'}}>
                {isRecording ? 
                    <WaveVoice />
                :
                    <ImageSpinner isTalking={isTalking} />
                }

            </div>
            <div style={{width:'100%',position:'absolute',top:16,left:0,display:'flex',justifyContent:'center',alignItems:'center'}}>
              <div style={{width:'90%',display:'flex',justifyContent:'start',alignItems:'self-start'}}>
                <img id="settingButton" onClick={() => {
                  setShowSetting(!showSetting)
                  setShowLangs(false)
                  setIsTalking(false);
                  setAudioUrl('');
                  document.addEventListener('click',closeFilter)
                  }} style={{cursor:'pointer'}} src="./icons/Setting.svg" alt="" />
                {
                  isSilent?
                    <img onClick={() => {
                      setIsSilent(false)
                      setIsTalking(false)
                    }} style={{marginLeft:'16px',cursor:'pointer',opacity:'60%'}} src="./icons/silentOn.svg" alt="" />
                  :
                    <img  onClick={() => {
                      setIsSilent(true)
                      setIsTalking(false)
                    }} style={{marginLeft:'16px',cursor:'pointer',opacity:'60%'}} src="./icons/silentOff.svg" alt="" />
                }
                {showSetting ?
                  <div id="settingBox" style={{backgroundColor:'#353535',width:'120px',cursor:'pointer',marginLeft:8,borderRadius:4}}>
                    <div onClick={() =>setShowLangs(true)} style={{paddingTop: 5,paddingBottom:5,paddingLeft:8,display:'flex',justifyContent:'start',alignItems:'center'}}>
                      <img src="./icons/Lang.svg" style={{marginRight:8}} alt="" />
                      <div style={{color:'white',fontSize:12,fontFamily: 'Poppins-Regular'}}>Language</div>
                    </div>
                    <div style={{width:'100%',height:'1px',backgroundColor:'#FFFFFF61'}}></div>
                    <div onClick={() => {
                        const conf = confirm('Are you sure you want to clear history?')
                        if(conf){
                          // setSelectedlangCode(item)
                          setShowLangs(false)
                          setChat([])
                          setShowSetting(false)
                          localStorage.removeItem('catchChats')
                        }                      
                    }} style={{paddingTop: 5,paddingBottom:5,paddingLeft:8,display:'flex',justifyContent:'start',alignItems:'center'}}>
                      <img src="./icons/clear.svg" style={{marginRight:8}} alt="" />
                      <div style={{color:'white',fontSize:12,fontFamily: 'Poppins-Regular'}}>Clear History</div>
                    </div>                  
                  </div>
                :undefined}
                {showLangs?
                  <div id="LangBox" style={{backgroundColor:'#353535',width:'100px',cursor:'pointer',marginLeft:8,borderRadius:4}}>
                    {lnguages.map((item,index) => {
                      return (
                        <>
                          <div onClick={() => {                           
                            const conf = confirm('Are you sure you want to change language? This causes clear your chat history')
                            if(conf){
                              setSelectedlangCode(item)
                              setShowLangs(false)
                              setChat([])
                              setIsTalking(false);
                              setAudioUrl('');
                              setShowSetting(false)
                              setIsLoading(false)
                              localStorage.removeItem('catchChats')
                            }

                          }} style={{display:'flex',textAlign:'left',borderBottomWidth:1,justifyContent:'space-between',paddingLeft:8,paddingRight:8,borderBottom:index < lnguages.length -1 ?'1px solid #FFFFFF61':'none',paddingTop: 4,paddingBottom:4,alignItems:'center'}}>
                            <div style={{color:'#FFFFFFDE',fontSize:'14px',fontFamily: 'Poppins-Regular'}}>
                              {item.lan}
                            </div>
                            {item.code == selectedLangCode.code ?
                              <img src="./icons/tik.svg" alt="" />
                            :
                              undefined
                            }
                          </div>
                          {/* {index < lnguages.length -1 ?
                           <div style={{width:'100%',height:'1px',backgroundColor:'#FFFFFF61'}}></div>
                          :undefined
                          } */}
                        </>
                      )
                    })}
                  </div>
                :undefined}
              </div>
            </div>
            {!isRecording && showSugestion && chat.length ==0 ?
              <div style={{ 
                position: 'absolute',
                width: '-webkit-fill-available',
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'row',
                top: 200,
                justifyContent: 'center',
                zIndex: 15,              
              }}>
                <Sugesstions sugges={suglist} dark handleOfferClick={_handleOfferClick}></Sugesstions>    
              </div>
             :undefined}
            <div id="chatMessageScrool" className="hiddenScrollBar" style={{height:400,display:'flex',justifyContent:'center',width:'100%',marginTop:32,overflowY:'scroll'}}>
              <div style={{width:'90%'}}>
                {
                  chat.map((item:any,index:number) => {
                    return (
                      <>
                        <div id={"chatitem"+index}>
                          {item.from == 'user' ?
                                    <div
                                      style={{
                                        width: '100%',
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
                                            color: '#FFFFFF',
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
                                backgroundColor: '#2D2D2D',
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
                                    color: '#FFFFFFDE',
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
                        backgroundColor: '#2D2D2D',
                        borderRadius: 4,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft: 18,
                        paddingRight: 20,
                        justifyContent: 'space-between',
                      }}>
                      <div>
                        <BeatLoader size={10}  color="white" />
                      </div>
                      <div onClick={() => {
                        handleStop(chat[chat.length -1].message_key)
                      }} style={{color: '#007BFF',
                                  fontSize: 14,
                                  cursor:'pointer',
                                  fontWeight: '500',
                                  fontFamily: 'Poppins-Regular',}}>
                        Stop
                      </div>
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
            {chat.length > 0  && chat[chat.length -1].aisles ?
              <div style={{width:'100%',position:'absolute',bottom:88,display:'flex',justifyContent:'center'}}>
                <div style={{width:'90%',display:'flex',justifyContent:'end'}}>
                    <HintComponent isTalking={isTalking} isloading={isLoading} instanceId={chat.filter(item => item.from =='admin')[chat.filter(item => item.from =='admin').length -1].instanceid} send={(text:string) => {
                      setAudioUrl('');
                      setIsTalking(false)
                      _handleOfferClick(text)
                    }}></HintComponent>

                </div>
              </div>
            :undefined}
            {/* new type */}
            <TypeAndRecord setIsTalking={setIsTalking} onstart={() => {
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
          {
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
          }
          {window.innerWidth < 520 ?
            <div onClick={() => setShowExitModal(true)} style={{position:'absolute',top:16 ,right:32}}>
              <img style={{width:24}} src={logOutIcon} alt="" />
            </div>
          :undefined}
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
          {
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
          }     
        </>
    )
}
export default Chat