import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
const Login = () => {
    return (
        <>
            <div style={{backgroundColor:'#121212',width:window.innerWidth,height:window.innerHeight,overflowY:'scroll'}}>
            <div style={{marginTop: 0}}>
            <div
                style={{
                color: '#FFFFFFDE',
                // width: 152,
                whiteSpace:'pre-line',
                marginLeft: 30,
                // lineHeight: 40,
                fontSize: 28,
                fontFamily: 'Poppins-Meduim',
                }}>
                Welcome {'\n'} Back!
            </div>
            </div>  
            <div style={{display:'flex',width:'100%',justifyContent:'center',alignItems:'center'}}>
                <div style={{padding:'16px 30px',width:'100%'}}>
                    <GoogleOAuthProvider clientId="750278697489-u68emmire3d35234obo1mne9v0eobmsu.apps.googleusercontent.com">

                      <GoogleLogin
                      
                        onSuccess={credentialResponse => {
                        //   setcertificate(credentialResponse);
                          console.log(credentialResponse);
                          let prof:any = jwt_decode(credentialResponse.credential? credentialResponse?.credential : '' )
                          console.log(jwt_decode(credentialResponse.credential? credentialResponse?.credential : '' ))
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
                          console.log('Login Failed');
                        }}
                      />                     
                    </GoogleOAuthProvider>                      
                </div>          
            </div>
            </div>        
        </>
    )
}
export default Login