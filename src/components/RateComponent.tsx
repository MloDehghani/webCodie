import closeIcon from '../assets/xmark.svg';
import unStarIcon from '../assets/star.svg';
import starIcon from '../assets/unStar.svg';

import { useState } from 'react';

type RateComponentProps = {
    onclose : () => void
    onSubmit: (rate:number) => void
}

const RateComponent:React.FC<RateComponentProps> = ({onclose,onSubmit}) => {
    const [star,setStar] = useState(0)
    return (
        <>
            <div style={{maxHeight:307,minHeight:307,minWidth:330,maxWidth:330,backgroundColor:'#1F1F1F',borderRadius:'16px',padding:16}}>
                <div style={{width:'100%',display:'flex',justifyContent:'end'}}>
                    <div onClick={onclose} style={{width:'30px',height:'30px',alignItems:'center',backgroundColor:'#353535',borderRadius:'100%',display:'flex',justifyContent:'center'}}>
                        <img style={{width:12,height:12}} src={closeIcon} />
                    </div>
                </div>
                <div style={{marginTop:12,fontFamily:'Poppins-Regular',width:'100%',display:'flex',justifyContent:'center'}}>
                    <div style={{fontSize:20,color:'#FFFFFFDE',fontWeight:500}}>How are you finding the app?</div>
                </div>
                <div style={{color:'#FFFFFF99',fontFamily:'Poppins-Regular',textAlign:'center',padding:'0px 18px',marginTop:'8px'}}>
                    We’ve been working hard on our features, so your feedback is super helpful to us.
                </div>
                <div style={{display:'flex',marginTop:8,justifyContent:'center',alignItems:'center'}}>
                    {
                        star > 0 ?
                            <img onClick={() => {setStar(1)}} style={{marginLeft:10,cursor:'pointer',marginRight:10}} src={starIcon} />
                        :
                            <img onClick={() => {setStar(1)}}  style={{marginLeft:10,cursor:'pointer',marginRight:10}}  src={unStarIcon} />
                    }
                    {
                        star > 1 ?
                            <img onClick={() => {setStar(2)}}  style={{marginLeft:10,cursor:'pointer',marginRight:10}} src={starIcon} />
                        :
                            <img onClick={() => {setStar(2)}}  style={{marginLeft:10,cursor:'pointer',marginRight:10}} src={unStarIcon} />
                    }
                    {
                        star > 2 ?
                            <img onClick={() => {setStar(3)}}  style={{marginLeft:10,cursor:'pointer',marginRight:10}} src={starIcon} />
                        :
                            <img onClick={() => {setStar(3)}}  style={{marginLeft:10,cursor:'pointer',marginRight:10}} src={unStarIcon} />
                    }
                    {
                        star > 3 ?
                            <img onClick={() => {setStar(4)}}  style={{marginLeft:10,cursor:'pointer',marginRight:10}} src={starIcon} />
                        :
                            <img onClick={() => {setStar(4)}}  style={{marginLeft:10,cursor:'pointer',marginRight:10}} src={unStarIcon} />
                    }
                    {
                        star > 4 ?
                            <img onClick={() => {setStar(5)}}  style={{marginLeft:10,cursor:'pointer',marginRight:10}} src={starIcon} />
                        :
                            <img onClick={() => {setStar(5)}}  style={{marginLeft:10,marginRight:10}} src={unStarIcon} />
                    }                                                                                
                </div>
                {
                    star > 0 ?
                        <div  style={{display:'flex',cursor:'pointer',justifyContent:'center',marginTop:24,alignItems:'center'}}>
                            <div onClick={() => onSubmit(star)} style={{color:'#FFFFFF',background:'#007BFF',borderRadius:8,fontFamily:'Poppins-Regular',fontSize:'14px',padding:'8px 12px'}}>Submit</div>
                        </div>
                    :undefined
                }
            </div>
        </>
    )
}
export default RateComponent