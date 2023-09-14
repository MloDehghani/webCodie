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
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        // flexDirection: 'row',
        flexDirection:'column',
        // height: 550,
        position: 'relative',
        zIndex: 20,
        justifyContent: 'center',
      }}>
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
        Ask me a question, or try one of these:
      </div>
      {sugess.map((item:any) => {
        return (
          <div
            key={item.text}
            style={{margin: '4px 0px'}}
            onClick={() => {
              props.handleOfferClick(item.text);
            }}>
            <div
              style={{
                width: 340,
                fontWeight: '400',
                marginBottom: 8,
                fontFamily: 'Poppins-Regular',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                color: props.dark ? 'white' : '#333333',
                backgroundColor: props.dark ? '#313133' : '#FFFFFF',
                // height: 55,
                padding: 10,
                fontSize: 14,
                textAlign: 'left',
                paddingLeft: 24,
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