/* eslint-disable @typescript-eslint/no-explicit-any */
import {useEffect, useState} from 'react';
import Ai1 from '../assets/Ai/1.png';
import Ai2 from '../assets/Ai/2.png';
import Ai3 from '../assets/Ai/3.png';
import Ai4 from '../assets/Ai/4.png';
import Ai5 from '../assets/Ai/5.png';
import Ai6 from '../assets/Ai/6.png';
import Ai7 from '../assets/Ai/7.png';
import Ai8 from '../assets/Ai/8.png';
import Ai9 from '../assets/Ai/9.png';

const ImageSpinner = (props: any) => {
  const [avatar, setAvatar] = useState(Ai1);
  const [aiName, setAiname] = useState(1);
  useEffect(() => {
    if (props.isTalking === true) {
      setTimeout(() => {
        if (aiName === 1) {
          setAvatar(Ai2);
          setAiname(2);
        }
        if (aiName === 2) {
          setAvatar(Ai3);
          setAiname(3);
        }
        if (aiName === 3) {
          setAvatar(Ai4);
          setAiname(4);
        }
        if (aiName === 4) {
          setAvatar(Ai5);
          setAiname(5);
        }
        if (aiName === 5) {
          setAvatar(Ai6);
          setAiname(6);
        }
        if (aiName === 6) {
          setAvatar(Ai7);
          setAiname(7);
        }
        if (aiName === 7) {
          setAvatar(Ai8);
          setAiname(1);
        }
      }, 500);
    } else {
      setTimeout(() => {
        if (aiName === 1) {
          setAvatar(Ai9);
          setAiname(8);
        } else {
          setAvatar(Ai1);
          setAiname(1);
        }
      }, 1400);
    }
  }, [aiName, props.isTalking]);
  return <img src={avatar} />;
};
export default ImageSpinner;
