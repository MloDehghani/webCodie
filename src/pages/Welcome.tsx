// import '../welcome.css'

import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();     
  return (
    <div
      style={{
        width: window.innerWidth,
        height: window.innerHeight,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        color: "white",
        position: "relative",
      }}
    >
      <div className="logo-container"
        style={{
          marginTop: "25px",
          width: " -webkit-fill-available",
          paddingLeft: "108px",
        }}
      >
        <img
          className="logo"
          src="/images/CodieAi.svg"
          alt="Codie ai"
          style={{ width: "250px",height:140}}
        />
      </div>
      <div
        className="container"
        style={{
          display: "flex",

          justifyContent: "space-between",
          color: "white",
          width: " -webkit-fill-available",
          paddingLeft: "119px",
        }}
      >
        <div className="leftContainer"  style={{marginTop:'-60px',position:'relative',zIndex:20}}>
          <div id="div-container">
            <p
              className="canterbury"
              style={{
                whiteSpace: "pre-line",
                lineHeight: "72px",
                fontSize: "44px",
                fontWeight: "500",
              }}
            >
              Canterbury Christ Church {"\n"} University
            </p>
            <p
              className="welcomeday"
              style={{
                lineHeight: "54px",
                fontSize: "32px",
                fontWeight: "500",
                marginTop: "-32px",
              }}
            >
              Welcoming Day
            </p>
            <div className="under-image" style={{ marginTop: "-40px" }}>
              <img className="under-image"
                src="/images/under_blue.svg"
                alt=""
                style={{ marginTop: "-50px" }}
              />
            </div>

            <p
              className="communicate"
              style={{ whiteSpace: "pre-line", marginTop: "40px" ,fontSize:'20px'}}
            >
              How would you prefer to communicate with us?{" "}
            </p>
          </div>
          <div className="image-container"
            style={{
              display: "flex",
              justifyContent: "start",
              // flexWrap:'wrap',
              alignItems: "center",
              marginLeft: "0px",
            }}
          >
            <div>
              <img
                onClick={() => {
                  window.open('https://play.google.com/store/apps/details?id=com.sellguru.Codie')
                }}
                className="chromeWeb-image2"
                // className="chromeWeb-image"
                src="/images/play.png"
                alt="google play"
                style={{ width: "200px",height:'65px', cursor: "pointer" }}
              />
            </div>
            <div>
              <img
              onClick={() => {
                navigate('/plan')
              }}
              className="chromeWeb-image2"
                // className="chromeWeb-image"
                src="/images/App Store.png"
                alt="chrome web"
                style={{
                  width: "200px",
                  height: "65px",
                  cursor: "pointer",
                  marginLeft: "16px",
                  
                }}
              />

            </div>            
            <div>
              <img
              onClick={() => {
                navigate('/plan')
              }}
              className="chromeWeb-image2"
                // className="chromeWeb-image"
                src="/images/chrome-web.svg"
                alt="chrome web"
                style={{
                  width: "200px",
                  // height: "80px",
                  cursor: "pointer",
                  marginLeft: "16px",
                  
                }}
              />

            </div>
          </div>
        </div>
        {/* style={{display:'flex',alignItems:'flex-end', height:'100%'}} */}
        <div
          className="macbook-container"

          style={{
            // position: "absolute", // Added position property
            // bottom: "0", // Positioned at the bottom
            // right: "0", // Positioned at the right
            width:'100%',
            alignSelf: "end",
          }}
        >
          <img
            className="macbook-image"
            src="/images/MacBook-17.png"
            alt="MacBook"
            style={{ width: "900px",position:'relative',right: '-110px',top:-40}}
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
