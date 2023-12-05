/* eslint-disable @typescript-eslint/no-explicit-any */
const Sugesstions = (props: any) => {
  const sugess = props.sugges
    ? props.sugges
    : [
        {
          text: ' Would you mind introducing yourself?',
        },
        {
          text: 'Please explain the types of hotel rooms',
        },
        {
          text: 'Tell me about attractions of the city around the hotel',
        },
      ];
    const resolveWidthBox =() => {
      if(window.innerWidth < 600){
        return '90%'
      }else if(window.innerWidth >= 600 && window.innerWidth < 1366){
        return '60%'
      }else{
        return '40%'
      }
    }
  return (
    <div
      style={{
        display: 'flex',
        width:resolveWidthBox(),
        alignItems: 'flex-start',
        backgroundColor:'#1F1F1F87',
        // opacity:'50%',
        padding:'16px',
        paddingTop:'32px',
        borderRadius:'20px',
        // flexDirection: 'row',
        flexDirection:'column',
        // height: 550,
        position: 'relative',
        zIndex: 20,
        justifyContent: 'center',
      }}>
        <div onClick={() => {
          props.close()
        }} style={{position:'absolute',display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer',backgroundColor:'#353535',width:'30px',height:'30px',borderRadius:'100%',top:12,right:16}}>
          <img src="./icons/close.svg" alt="" />
        </div>
      <div
        style={{
          fontSize: 16,
          marginBottom: '16px',
          textAlign: 'center',
          fontStyle: 'normal',
          fontFamily: 'Poppins-Regular',
          fontWeight: '500',
          color: 'white',
        }}>
          {props.title ? props.title:'Ask me a question, or try one of these:'}
      </div>
      {sugess.map((item:any) => {
        return (
          <div
            key={item.text}
            style={{margin: '4px 0px',width:'-webkit-fill-available'}}
            onClick={() => {
              props.handleOfferClick(item.text);
            }}>
            <div
              style={{
                width: '-webkit-fill-available',
                fontWeight: '400',
                marginBottom: 8,
                fontFamily: 'Poppins-Regular',
                display: 'flex',
                alignItems: 'center',
                cursor:'pointer',
                justifyContent: 'flex-start',
                color: props.dark ? 'white' : '#333333',
                backgroundColor: props.dark ? '#1F1F1F' : '#FFFFFF',
                // height: 55,
                padding: 10,
                fontSize: 14,
                textAlign: 'left',
                paddingLeft: 16,
                // paddingRight: 4,
                borderRadius: 8,
                borderColor: props.dark ? '#313133' : '#FFFFFF',
                borderWidth: '1px',
              }}>
              {item.text}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Sugesstions;
