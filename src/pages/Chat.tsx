/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import {WaveVoice,ImageSpinner, Sugesstions} from "../components"
import micIcon from '../assets/mic.svg';
import useSpeechToText from "react-hook-speech-to-text";
import { useConstructor } from "../help";
import makeid from '../Hoc/RandomKey';
import Flow from "../api/Flow";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Chat = () => {
    const [audioUrl, setAudioUrl] = useState<string>('');
    const audioRef = useRef<any>()      
    const [isTalking, setIsTalking] = useState(false);    
    const [isLoading, setIsLoading] = useState(false);
    const [useApikey, setApiKey] = useState('');
    const {
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText
    } = useSpeechToText({
        continuous: true,
        crossBrowser: true,
        timeout:6000,
        googleApiKey: 'AIzaSyB904oDQEZb5M1vdJYxVhXOtU3_URla1Nk',
        // speechRecognitionProperties: { interimResults: true },
        useLegacyResults: false
    });    
    const [showSugestions, setShowSuggestions] = useState(false);    
    const [chat, setChat] = useState<Array<any>>([]);   
    const [showSugestion,setShowSuggestion] = useState(false); 
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
                  Flow.chat(
                    {
                      text: newChat.message,
                      language: 'English',
                      message_key: newChat.message_key,
                      apikey: useApikey,
                      getcurrentconvesationid:
                        adminChats.length > 0
                          ? adminChats[adminChats.length - 1].currentconverationid
                          : 1,
                    }                  
                  ).then(res => {
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
                    console.log(res);
                    setIsLoading(false);
                  })
               }
              }
          }

      }  
    }    
    const navigate = useNavigate();    
    const pageScroll = () => {
        document.getElementById('chatMessageScrool1')?.scrollBy(0,1);
        setTimeout(pageScroll,300);
    }     
    const _handleOfferClick = (offer: string) => {
      // console.log(offer.substring(0, 6));
      setShowSuggestions(false);
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
          Flow.chat(
            {
              text: offer,
              language: 'English',
              message_key: newChat.message_key,
              apikey: useApikey,
              getcurrentconvesationid:
                adminChats.length > 0
                  ? adminChats[adminChats.length - 1].currentconverationid
                  : 1,
            }
          ).then(async (res: any) => {
            console.log(res);

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
                // aisles:JSON.parse(res.suggestion_list),
              };
              chat.push(responseApi);
              setChat(chat);
              setAudioUrl(responseApi.audio)
              setIsTalking(true);
              setChat(chat)                  
              console.log(res);
              setIsLoading(false);              
              // await AsyncStorage.setItem('chatsCash' + useApikey, JSON.stringify(chat));
          });

      }, 1);
    };       
    useEffect(() => {
      if(!isRecording){
          console.log('try send')
          sendToApi()
      }      
      if(audioRef.current){
          const refren = audioRef.current  as any   
          refren.load()
      }   
      if(document.getElementById('chatMessageScrool1')){
          setTimeout(function() {
              pageScroll()
          }, 5000);   
      }              
    })
    useConstructor(() => {
      if(!localStorage.getItem('accessToken')){
        setTimeout(() => {
          navigate('/');
        }, 200);
      }
      if(!localStorage.getItem('ApiKey')){
        setTimeout(() => {
          navigate('/');
        }, 200);
      }      
      setTimeout(() => {
        setShowSuggestion(true)
      }, 4000);
      if(localStorage.getItem('ApiKey')!= null){
        setApiKey(localStorage.getItem('ApiKey') as string)
      }
    })
    return (
        <>
         <div className="hiddenScrollBar" style={{backgroundColor:'#121212',position:'relative',width:window.innerWidth,height:window.innerHeight,overflowY:'scroll'}}>
            <div style={{marginTop: 50,maxHeight:80,minHeight:80,display:'flex',justifyContent:'center',alignItems:'center'}}>
                {isRecording ? 
                    <WaveVoice />
                :
                    <ImageSpinner isTalking={isTalking} />
                }

            </div>
            {!isRecording && showSugestion && chat.length ==0 ?
              <div style={{ 
                position: 'absolute',
                width: '100%',
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'row',
                top: 200,
                justifyContent: 'center',
                zIndex: 50,              
              }}>
                <Sugesstions dark handleOfferClick={_handleOfferClick}></Sugesstions>    
              </div>
             :undefined}
            <div id="chatMessageScrool1" className="hiddenScrollBar" style={{height:320,marginTop:32,overflowY:'scroll'}}>
              {
                chat.map((item:any) => {
                  return (
                    <>
                      <div>
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
                              width: '100%',
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
                              <div
                                style={{
                                  marginTop: 11,
                                  width: '100%',
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                  flexDirection: 'row',
                                }}>
                                  <>
                                    <div>
                                      {/* <Svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill={
                                          liked.includes(index)
                                            ? 'white'
                                            : 'none'
                                        }>
                                        <Path
                                          d="M4.8906 7.28433L7.69058 0.984375C8.24754 0.984375 8.78168 1.20562 9.1755 1.59945C9.56932 1.99327 9.79057 2.52741 9.79057 3.08436V5.88434H13.7525C13.9555 5.88205 14.1565 5.9239 14.3416 6.007C14.5268 6.09009 14.6917 6.21246 14.8248 6.3656C14.958 6.51875 15.0563 6.69901 15.1129 6.89391C15.1695 7.08881 15.183 7.29368 15.1525 7.49433L14.1865 13.7943C14.1359 14.1281 13.9663 14.4324 13.7091 14.6511C13.4518 14.8698 13.1242 14.9881 12.7866 14.9843H4.8906M4.8906 7.28433V14.9843M4.8906 7.28433H2.79062C2.41932 7.28433 2.06322 7.43183 1.80067 7.69438C1.53812 7.95693 1.39062 8.31302 1.39062 8.68433V13.5843C1.39063 13.9556 1.53812 14.3117 1.80067 14.5742C2.06322 14.8368 2.41932 14.9843 2.79062 14.9843H4.8906"
                                          stroke={
                                            liked.includes(index)
                                              ? '#FFFFFF99'
                                              : 'white'
                                          }
                                          stroke-opacity="0.6"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                      </Svg> */}
                                    </div>
                                    <div
                                      style={{marginLeft: 12}}>
                                      {/* <Svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill={
                                          disliked.includes(index)
                                            ? 'white'
                                            : 'none'
                                        }>
                                        <Path
                                          d="M11.4456 8.68449L8.64569 14.9844C8.08874 14.9844 7.55461 14.7631 7.16079 14.3693C6.76697 13.9755 6.54572 13.4414 6.54572 12.8844V10.0845H2.5838C2.38086 10.0868 2.17986 10.0449 1.99471 9.96181C1.80955 9.87871 1.64468 9.75635 1.51151 9.60321C1.37835 9.45007 1.28007 9.2698 1.22348 9.07491C1.1669 8.88001 1.15337 8.67514 1.18382 8.47449L2.1498 2.17461C2.20043 1.84078 2.37 1.53649 2.62726 1.31782C2.88453 1.09914 3.21216 0.980811 3.54978 0.984628H11.4456M11.4456 8.68449V0.984628M11.4456 8.68449H13.3146C13.7108 8.69149 14.0957 8.5528 14.3964 8.29472C14.697 8.03665 14.8925 7.67717 14.9456 7.28451V2.3846C14.8925 1.99195 14.697 1.63247 14.3964 1.37439C14.0957 1.11632 13.7108 0.977622 13.3146 0.984628H11.4456"
                                          stroke={
                                            disliked.includes(index)
                                              ? '#FFFFFF99'
                                              : 'white'
                                          }
                                          stroke-opacity="0.6"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                      </Svg> */}
                                    </div>
                                  </>
                              </div>
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
                    style={{
                      width: '100%',
                      height: 48,
                      backgroundColor: '#2D2D2D',
                      borderRadius: 4,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingLeft: 18,
                      paddingRight: 20,
                      justifyContent: 'center',
                    }}>
                    <div>
                      <BeatLoader  color="white" />
                    </div>
                  </div>
              ) : undefined}      
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
              {!showSugestions && interimResult === undefined && chat.length === 0 ? (
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
              ) : undefined}
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

            <div style={{position:'absolute',width:'100%',bottom:24 ,height: 50,display:'flex',justifyContent:'center',alignItems:'center'}}>
                <button disabled={isLoading} onClick={isRecording?() => {
                  stopSpeechToText()
                  sendToApi()   
                }:() => {
                  startSpeechToText()
                }} style={{width:isRecording? 66: 56,height:isRecording? 66: 56,backgroundColor:'#007BFF',display:'flex',justifyContent:'center',cursor:'pointer',alignItems:'center',borderRadius:'100%'}}>
                    <img style={{width:isRecording? 35: 30}} src={micIcon} />
                </button>
            </div>
         </div>
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
        </>
    )
}
export default Chat