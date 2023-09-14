/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import Auth from "../api/Auth";
import { useNavigate } from "react-router-dom";
const JustGoogleLogin =() => {
    const navigate = useNavigate();    

    return (
        <>
            <div
                style={{
                backgroundColor: "#121212",
                width: window.innerWidth,
                height: window.innerHeight,
                // overflowY: "scroll",
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                flexDirection:'column',
                // paddingLeft:'20px',
                // paddingRight:'20px'

                }}
            >
                <GoogleOAuthProvider clientId="750278697489-u68emmire3d35234obo1mne9v0eobmsu.apps.googleusercontent.com">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      //   setcertificate(credentialResponse);
                      console.log(credentialResponse);
                     const prof: any = jwt_decode(
                        credentialResponse.credential
                          ? credentialResponse?.credential
                          : ""
                      );
                  
                      Auth.login({
                        google_json:prof
                      },(res) => {
                        if(res.access_token){
                            localStorage.setItem('accessToken',res.access_token)
                            navigate('/chat');
                        }                        
                      })
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
        </div>
        </>
    )
}
export default JustGoogleLogin