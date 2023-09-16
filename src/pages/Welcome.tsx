// import '../welcome.css'

const Welcome = () => {
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
      <div
        style={{
          marginTop: "25px",
          width: " -webkit-fill-available",
          paddingLeft: "119px",
        }}
      >
        <img
          className="logo"
          src="/images/codie-logo2.svg"
          alt="Codie ai"
          style={{ width: "250px", height: "140px" }}
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
        <div style={{marginTop:'-60px'}}>
          <div id="div-container">
            <p
              className="canterbury"
              style={{
                whiteSpace: "pre-line",
                lineHeight: "72px",
                fontSize: "48px",
                fontWeight: "500",
              }}
            >
              Canterbury Christ Church {"\n"} University
            </p>
            <p
              className="welcomeday"
              style={{
                lineHeight: "54px",
                fontSize: "36px",
                fontWeight: "500",
                marginTop: "-32px",
              }}
            >
              Welcoming Day
            </p>
            <div style={{ marginTop: "-40px" }}>
              <img
                src="/images/under_blue.svg"
                alt=""
                style={{ marginTop: "-50px" }}
              />
            </div>

            <p
              className="communicate"
              style={{ whiteSpace: "pre-line", marginTop: "40px" }}
            >
              How would you prefer to communicate {"\n"} with us?{" "}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "-90px",
            }}
          >
            <img
              className="gplay-image"
              src="/images/google-play.svg"
              alt="google play"
              style={{ width: "260px", height: "auto", cursor: "pointer" }}
            />
            <img
              className="chromeWeb-image"
              src="/images/chrome-web.svg"
              alt="chrome web"
              style={{
                width: "250px",
                height: "auto",
                cursor: "pointer",
                marginLeft: "16px",
              }}
            />
          </div>
        </div>
        {/* style={{display:'flex',alignItems:'flex-end', height:'100%'}} */}
        <div
          className="macbook-container"
          style={{
            // position: "absolute", // Added position property
            // bottom: "0", // Positioned at the bottom
            // right: "0", // Positioned at the right
            alignSelf: "end",
          }}
        >
          <img
            className="macbook-image"
            src="/images/MacBook.svg"
            alt="MacBook"
            style={{ width: "650px", height: "500px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
