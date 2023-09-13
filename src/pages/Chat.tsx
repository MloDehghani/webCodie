/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {WaveVoice,ImageSpinner} from "../components"
import micIcon from '../assets/mic.svg';
import useSpeechToText from "react-hook-speech-to-text";

const Chat = () => {
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText
    } = useSpeechToText({
        continuous: true,
        crossBrowser: true,
        timeout:100000,
        googleApiKey: 'AIzaSyB904oDQEZb5M1vdJYxVhXOtU3_URla1Nk',
        // speechRecognitionProperties: { interimResults: true },
        useLegacyResults: false
    });    
    const [showSugestions, setShowSuggestions] = useState(false);    
    const [res, setRes] = useState('');    
    const [chat, setChat] = useState<Array<any>>([]);    
    console.log(interimResult)
    return (
        <>
         <div className="hiddenScrollBar" style={{backgroundColor:'#121212',position:'relative',width:window.innerWidth,height:window.innerHeight,overflowY:'scroll'}}>
            <div style={{marginTop: 50,display:'flex',justifyContent:'center',alignItems:'center'}}>
                {isRecording ? 
                    <WaveVoice />
                :
                    <ImageSpinner />
                }

            </div>



              <div
                style={{
                  width: '100%',
                  position: 'absolute',
                  bottom: 50,
                  display: 'flex',
                  justifyContent:'center',
                  padding: '0px 16px',
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
                padding: '0px 16px',
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
                <div onClick={isRecording?() => {
                  stopSpeechToText()   
                }:() => {
                  startSpeechToText()
                }} style={{width:isRecording? 66: 56,height:isRecording? 66: 56,backgroundColor:'#007BFF',display:'flex',justifyContent:'center',cursor:'pointer',alignItems:'center',borderRadius:'100%'}}>
                    <img style={{width:isRecording? 35: 30}} src={micIcon} />
                </div>
            </div>
         </div>
        </>
    )
}
export default Chat