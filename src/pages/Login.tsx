import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
const Login = () => {
  return (
   
      <div
        style={{
          backgroundColor: "#121212",
          width: window.innerWidth,
          height: window.innerHeight,
          // overflowY: "scroll",
        display:'flex',
        flexDirection:'column',
        // paddingLeft:'20px',
        // paddingRight:'20px'

        }}
      >
        <div>
          <img src="/icons/leftVector.svg" alt="" />
        </div>
        <div style={{ marginTop: 0 }}>
          <div
            style={{
              color: "#FFFFFFDE",
              // width: 152,
              whiteSpace: "pre-line",
              marginLeft: 30,
              // lineHeight: 40,
              fontSize: 28,
              fontFamily: "Poppins-Meduim",
            }}
          >
            Welcome {"\n"} Back!
          </div>
        </div>
        {/* <div
          style={{
            paddingRight:'20px',
            paddingLeft:'20px',
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        > */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
           
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              
             
              }}
            >
              <label htmlFor="email">Your Email</label>
              <input type="text" placeholder="Enter your email..." />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                paddingRight:'20px',
                paddingLeft:'20px',
              }}
            >
              <label htmlFor="email">Password</label>
              <input type="text" placeholder="Enter your password..." />
            </div>
            <button style={{ marginLeft: "auto" }}>Forget password</button>
            <div style={{ width: "100%" }}>
              <button style={{ width: "100%" }}>Sign in</button>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "8px 0",
                  width: "80%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                className="flex items-center justify-center  my-2 w-[80%] mx-auto"
              >
                <div
                  style={{
                    backgroundColor: "#8C8A93",
                    height: "1px",
                    width: "100%",
                  }}
                  className="bg-[#8C8A93] h-px w-full"
                ></div>{" "}
                {/* left line */}
                <div
                  style={{
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    color: "#253343",
                    fontWeight: "300",
                    opacity: "80",
                    fontSize: "16px",
                    lineHeight: "27.25px",
                  }}
                  className="px-4 text-[#253343]/80 font-[300] text-[16px] leading-[27.25px]"
                >
                  or
                </div>{" "}
                {/* or text */}
                <div
                  style={{
                    backgroundColor: "#8C8A93",
                    height: "1px",
                    width: "100%",
                  }}
                  className="bg-[#8C8A93] h-px w-full"
                ></div>{" "}
                {/* right line */}
              </div>
              {/* <div style={{ padding: "16px 30px", width: "100%" }}> */}
              <button
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <GoogleOAuthProvider clientId="750278697489-u68emmire3d35234obo1mne9v0eobmsu.apps.googleusercontent.com">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      //   setcertificate(credentialResponse);
                      console.log(credentialResponse);
                    //  const prof: any = jwt_decode(
                    //     credentialResponse.credential
                    //       ? credentialResponse?.credential
                    //       : ""
                    //   );
                  
                      console.log(
                        jwt_decode(
                          credentialResponse.credential
                            ? credentialResponse?.credential
                            : ""
                        )
                      );
                      //   authentication.register(
                      //     {
                      //       google_json:prof
                      //     },
                      //     (res) => {
                      //       if (res.status == 200 && res.data.access_token) {
                      //         storeTokenInLocalStorage(res.data.access_token);
                      //         navigate(APP_ROUTES.DASHBOARD);
                      //       } else {
                      //         setAlertmassage(res.data);
                      //         // alert.current?.showToast();
                      //         toast.error('Invalid email or password')
                      //       }
                      //     }
                      //   );
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </GoogleOAuthProvider>
              </button>
            </div>
            <div
              style={{
                marginTop: "16px",
                marginRight: "auto",
                color: "#253343",
                fontSize: "14px",
                fontWeight: "400",
              }}
              className="mt-4 text-center intro-x xl:mt-3 text-[#253343]/80 font-[500] text-[14px] leading-[24px] dark:text-slate-500 xl:text-left"
            >
              Don&apos;t have an acoount?{" "}
              <a className="font-[400] text-[14px] leading-[21.07px] text-[#1b3896] cursor-pointer dark:text-slate-200">
                Sign up
              </a>
              {/* <a className="text-primary dark:text-slate-200" href="">
                    Privacy Policy
                  </a> */}
            </div>
          </div>
        {/* </div> */}
      </div>
   
  );
};
export default Login;
