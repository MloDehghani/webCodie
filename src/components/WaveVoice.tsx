import {useEffect, useState} from 'react';

const WaveVoice = () => {
  const [waveHeight, setWaveHeight] = useState(15);
  const [palse1 , setPalse1]= useState(true);
  const [waveHeight1, setWaveHeight1] = useState(15);
  const [palse2 , setPalse2]= useState(true);
  const [waveHeight2, setWaveHeight2] = useState(15);
  const [palse3 , setPalse3]= useState(true);  
  useEffect(() => {
    setTimeout(() => {
      console.log(waveHeight)
      if(palse1) {
        setWaveHeight(waveHeight+5)
      }else{
        setWaveHeight(waveHeight -5)
      }
      if(waveHeight == 80) {
        setPalse1(false)
      }
      if(waveHeight <= 15){
        setPalse1(true)
      }
    }, 40);
  },[palse1, waveHeight]);
  useEffect(() => {
    setTimeout(() => {
      if(palse2) {
        setWaveHeight1(waveHeight1+5)
      }else{
        setWaveHeight1(waveHeight1 -5)
      }
      if(waveHeight1 == 70) {
        setPalse2(false)
      }
      if(waveHeight1 <= 15){
        setPalse2(true)
      }
    }, 25);
  },[palse2, waveHeight1]);  
  useEffect(() => {
    setTimeout(() => {
      if(palse3) {
        setWaveHeight2(waveHeight2+5)
      }else{
        setWaveHeight2(waveHeight2 -5)
      }
      if(waveHeight2 == 65) {
        setPalse3(false)
      }
      if(waveHeight2 <= 15){
        setPalse3(true)
      }
    }, 50);
  },[palse3, waveHeight2]);    
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 32,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 7,
      }}>
      <div
        style={{
          width: 15,
          height: waveHeight,
          backgroundColor: 'white',
          borderRadius: 200,
        }}
      />
      <div
        style={{
          width: 15,
          height: waveHeight1,
          backgroundColor: 'white',
          borderRadius: 200,
        }}
      />
      <div
        style={{
          width: 15,
          height: waveHeight2,
          backgroundColor: 'white',
          borderRadius: 200,
        }}
      />
      <div
        style={{
          width: 15,
          height: waveHeight1,
          backgroundColor: 'white',
          borderRadius: 200,
        }}
      />
      <div
        style={{
          width: 15,
          height: waveHeight,
          backgroundColor: 'white',
          borderRadius: 200,
        }}
      />
    </div>
  );
};
export default WaveVoice;
