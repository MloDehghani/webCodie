/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../api/Auth";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { useState ,useEffect,useCallback} from "react";
import { useConstructor } from "../help";
import { MoonLoader } from "react-spinners";
import { toast } from "react-toastify";


const validationSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  email: Yup.string().email("Please enter a valid email").required("Required"),
  password: Yup.string()
    .required("Please enter a password")
    // check minimum characters
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must contain 8 characters including uppercase, lowercase, number and special case character"
    ),
  acceptTerms: Yup.boolean().oneOf(
    [true],
    "Please accept the terms and conditions"
  ),
});
const initialValues = {
  username: "",
  email: "",
  password: "",
  acceptTerms: false,
};

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  // Form Validation
  const navigate = useNavigate();   
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const submitDisabled = Object.keys(formik.errors).length > 0 || !formik.dirty;
  const [registerWidth, setRegisteWidth] = useState<number>();
  const handleResize = useCallback(() => {
    if (document.getElementById("authButton")) {
      setTimeout(() => {
        const width: number = document.getElementById("authButton")
          ?.offsetWidth as number;
        console.log(width);
        setRegisteWidth(width);
      }, 200);
    }
  }, [registerWidth]);
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize, false);
  }, []);
  useConstructor(() => {
    if(localStorage.getItem('accessToken') && localStorage.getItem('ApiKey')){
      const token: string = localStorage.getItem('accessToken') as string
      const apikey: string = localStorage.getItem('ApiKey') as string
      console.log(token)
      console.log(apikey)
      if(token.length > 0 && apikey.length > 0){
        setTimeout(() => {
          navigate('/chat')
        }, 300);
      }
    } 
  })  
  const [isLoading,setIsLoading] = useState(false); 
  return (
    <div
      style={{
        backgroundColor: "#121212",
        width: window.innerWidth < 600 ? window.innerWidth :window.innerWidth / 2,
        height: window.innerHeight,
        // overflowY: "scroll",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Poppins-Meduim",
        // paddingLeft:'20px',
        // paddingRight:'20px'
      }}
    >
      {isLoading?
          <div style={{width:window.innerWidth,height:window.innerHeight,backgroundColor:'black',position:'absolute',zIndex: 50,top:0,left:0,opacity:'0.4'}}></div>
      :undefined}
      {isLoading ?
        <div style={{position:'absolute',width:window.innerWidth,height:window.innerHeight,display:'flex',zIndex:51,justifyContent:'center',top:0,left:0,alignItems:'center'}}>
          <MoonLoader color="#0c63f0" />
        </div>
        :
        undefined
      }      
      <div onClick={() => navigate('/plan')} style={{ paddingLeft: "18px", marginTop: "25px",  }}>
        <img src="/icons/leftVector.svg" alt="leftArrow" style={{cursor:'pointer'}} />
      </div>
      <div style={{ marginTop: "-10px" }}>
        <p
          style={{
            color: "#FFFFFFDE",
            // width: 152,
            whiteSpace: "pre-line",
            paddingLeft: "24px",
            lineHeight: "30px",
            fontSize: "28px",
            fontWeight: "500",
            fontFamily: "Poppins-Meduim",
          }}
        >
          Create {"\n"} Account
        </p>
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
            width: " -webkit-fill-available",
            paddingRight: "24px",
            paddingLeft: "24px",
            // marginTop: "18px",
          }}
        >
          <label
            style={{
              fontWeight: 300,
              fontFamily:'Poppins-Regular',              
              lineHeight: "24px",
              fontSize: "16px",
              color:'white',
              marginBottom: "7px",
            }}
            htmlFor="username"
          >
            Full Name
          </label>
          <input className="registerName"
            {...formik.getFieldProps("username")}
            style={
              formik.errors.username && formik.touched.username
                ? {
                    padding: "12px 16px",
                    backgroundColor: "#1F1F1F",
                    border: "1px solid red",
                    borderRadius: "4px",
                    marginTop: "-5px",
                    color:'white'
                  }
                : {
                    padding: "12px 16px",
                    backgroundColor: "#1F1F1F",
                    border: "none",
                    color:'white',
                    borderRadius: "4px",
                    marginTop: "-5px",
                  }
            }
            type="text"
            placeholder="Enter your Full Name..."
          />
          {formik.errors.username && formik.touched.username ? (
                      <div  style={{ color: "red", maxHeight:10,fontSize: "10px",fontFamily:'Poppins-Regular', marginTop: "3px" }}>
                        {formik.errors.username}
                      </div>
                    ):<div style={{height: '10px'}}></div>}          
          {/* {formik.errors.username && formik.touched.username && (
                <p
                  style={{ color: "red", fontSize: "12px", marginTop: "3px" }}
               
                >
                  {formik.errors.username}
                </p>
              )} */}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: " -webkit-fill-available",
            paddingRight: "24px",
            paddingLeft: "24px",
            color:'white',
            marginTop: "18px",
          }}
        >
          <label
            style={{
              fontWeight: 300,
              fontFamily:'Poppins-Regular',              
              lineHeight: "24px",
              fontSize: "16px",
              color:'white',
              marginBottom: "7px",
            }}
            htmlFor="email"
          >
            Your Email
          </label>
          <input className="registerEmail"
            {...formik.getFieldProps("email")}
            // style={{
            //   padding: "12px 16px",
            //   backgroundColor: "#1F1F1F",
            //   border: "none",
            //   borderRadius: "4px",
            // }}

            style={
              formik.errors.email && formik.touched.email
                ? {
                    padding: "12px 16px",
                    backgroundColor: "#1F1F1F",
                    border: "1px solid red",
                    borderRadius: "4px",
                    marginTop: "-5px",
                    color:'white',
                  }
                : {
                    padding: "12px 16px",
                    backgroundColor: "#1F1F1F",
                    border: "none",
                    borderRadius: "4px",
                    marginTop: "-5px",
                    color:'white',                    
                  }
            }
            type="text"
            placeholder="Enter your email..."
          />
          {formik.errors.email && formik.touched.email ? (
                      <div  style={{ color: "red", maxHeight:10,fontSize: "10px",fontFamily:'Poppins-Regular', marginTop: "3px" }}>
                        {formik.errors.email}
                      </div>
                    ):<div style={{height: '10px'}}></div>}          
          {/* {formik.errors.email && formik.touched.email && (
                <p
                  style={{ color: "red", fontSize: "12px", marginTop: "3px" }}
               
                >
                  {formik.errors.email}
                </p>
              )} */}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: " -webkit-fill-available",
            paddingRight: "24px",
            paddingLeft: "24px",
            marginTop: "16px",
          }}
        >
          <label
            style={{
              fontWeight: 300,
              lineHeight: "24px",
              color:'white',
              fontFamily:'Poppins-Regular',              
              fontSize: "16px",
              marginBottom: "7px",
            }}
            htmlFor="email"
          >
            Password
          </label> 
          <div   style={
                formik.touched.password && formik.errors.password
                  ? {
                      padding: "10px 16px",
                      backgroundColor: "#1F1F1F",
                      border: "1px solid red",
                      borderRadius: "4px",
                    display:'flex',
                    alignItems:'center',
                    marginTop: "-5px",
                      fontFamily: "Poppins-Regular",
                      color: "white",
                   
                    }
                  : {
                    display:'flex',
                    alignItems:'center',
                      padding: "10px 16px",
                      backgroundColor: "#1F1F1F",
                      border: "none",
                      fontFamily: "Poppins-Regular",
                      color: "white",
                      borderRadius: "4px",
                      marginTop: "-5px",
                   
                    }
              }>
            <input className="registerPass"
              {...formik.getFieldProps("password")}
            style={{ backgroundColor: "#1F1F1F", width:'100%',color:'white'}}
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password..."
            />
            {!passwordVisible ? (
              <AiOutlineEyeInvisible
               size='20px'
               
                onClick={() => {
                  setPasswordVisible((prev) => !prev);
                }}
                // className={`cursor-pointer ${
                //   formik.values.password
                //     ? "text-[#3C3744]"
                //     : "text-[#3C3744]/60"
                // } `}

                style={formik.values.password ? { cursor: "pointer", color:"white"}:{cursor: "pointer",color:'white',opacity:'0.3'}}
              />
            ) : (
              <AiOutlineEye
              size='20px'
                color="white"
                onClick={() => {
                  setPasswordVisible((prev) => !prev);
                }}
                // className={`cursor-pointer ${
                //   formik.values.password
                //     ? "text-[#3C3744]"
                //     : "text-[#3C3744]/60"
                // } `}
                style={formik.values.password ? { cursor: "pointer", color:"white"}:{cursor: "pointer",color:'white',opacity:'0.3'}}
              />
            )}
          </div>
          {formik.errors.password && formik.touched.password ? (
                      <div  style={{ color: "red",fontSize: "10px",fontFamily:'Poppins-Regular', marginTop: "3px" }}>
                        {formik.errors.password}
                      </div>
                    ):<div style={{height: '10px'}}></div>}          
          {/* <input
            {...formik.getFieldProps("password")}
            style={
              formik.touched.password && formik.errors.password
                ? {
                    padding: "12px 16px",
                    backgroundColor: "#1F1F1F",
                    border: "1px solid red",
                    borderRadius: "4px",
                    marginTop: "-5px",
                    color:'white',          
                  }
                : {
                    padding: "12px 16px",
                    backgroundColor: "#1F1F1F",
                    border: "none",
                    borderRadius: "4px",
                    marginTop: "-5px",
                    color:'white',          
                  }
            }
            type="password"
            placeholder="Enter your password..."
          /> */}
          {/* {formik.errors.password && formik.touched.password && (
                          <p  style={{ color: "red", fontSize: "12px", marginTop: "3px" }}>
                            {formik.errors.password}
                          </p>
                        )} */}
        </div>

        <div
          style={{
            paddingLeft: "20px",
            width: " -webkit-fill-available",
            textAlign: "left",
            marginTop: "4px",
            marginBottom: "32px",
            lineHeight: "18px",
            fontSize: "12px",
            fontWeight: "300",
            display: "flex",
            alignItems: "center",
            color:'white',
          }}
          className="flex  mt-[10.5px] text-xs intro-x text-slate-600 dark:text-slate-500 sm:text-sm"
        >
          <input
            id="remember-me"
            {...formik.getFieldProps("acceptTerms")}
            name="acceptTerms"
            type="checkbox"
            style={{
              backgroundColor: "red",
              border: "1px solid #007BFF",
              borderRadius: "5px",
            }}
            // className="mr-2 cursor-pointer form-checkbox border-[#1b3896] border-[1px] rounded-[5px] focus:ring-0  w-[18px] h-[18px]  "
          />
          <label htmlFor="remember-me">
            I agree to the{" "}
            <Link
              target="_blank"
              to={"https://codie.ai/terms-conditions/"}
              style={{ color: "#007BFF" }}
            >
              Terms & Conditions
            </Link>{" "}
            <span>&nbsp;and</span>
            <Link
              to={"https://codie.ai/privacypolicy/"}
              target="_blank"
              style={{ color: "#007BFF" }}
            >
              {" "}
              Privacy Policy
            </Link>
          </label>
        </div>
        <div
          style={{
            width: " -webkit-fill-available",
            paddingRight: "24px",
            paddingLeft: "24px",
          }}
        >
          <button
            disabled={submitDisabled}
            onClick={() => {
              setIsLoading(true)
              Auth.register(
                {
                  full_name: formik.values.username,
                  email: formik.values.email,
                  password:formik.values.password,
                },
                res => {
                  if (res.access_token) {
                    setIsLoading(false);
                    localStorage.setItem('accessToken', res.access_token);
                    navigate('/chat')
                  }else{
                    toast.error(res,{theme:'colored'})
                    setIsLoading(false);
                  }
                },
              );              
            }}
            id="authButton"
            style={{
              marginBottom: "20px",
              width: "100%",
              opacity:submitDisabled ? 0.5 : 1,
              backgroundColor: "#007BFF",
              height: "50px",
              color:'white',
              fontFamily:'Poppins-Regular',
              borderRadius: "5px",
              lineHeight: "25.6px",
              fontSize: "16px",
              fontWeight: 300,
            }}
          >
            Sign up
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "8px 0",
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "25px",
            }}
          >
            {/* left line */}
            <div
              style={{
                background: `linear-gradient(to left, rgba(140, 138, 147, 1), rgba(140, 138, 147, 0))`,
                height: "1px",
                width: "100%",
              }}
            ></div>
            {/* or text */}
            <div
              style={{
                color: "#FFFFFF",
                opacity: ".87",
                paddingLeft: "8px",
                paddingRight: "8px",
                fontFamily:'Poppins-Regular',
                fontWeight: 300,

                fontSize: "16px",
                lineHeight: "27.25px",
              }}
            >
              or
            </div>{" "}
            {/* <div
              style={{
                backgroundColor: "#8C8A93",
                height: "1px",
                width: "100%",
              }}
            ></div>{" "} */}
            {/* right line */}
            <div
              style={{
                background: `linear-gradient(to right, rgba(140, 138, 147, 1), rgba(140, 138, 147, 0))`,
                height: "1px",
                width: "100%",
              }}
            ></div>
          </div>
          {/* <div style={{ padding: "16px 30px", width: "100%" }}> */}
          {/* <button
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50px",
            }}
          > */}
          <div style={{display:'flex',justifyContent:'center'}}>
            <GoogleOAuthProvider clientId="750278697489-u68emmire3d35234obo1mne9v0eobmsu.apps.googleusercontent.com">
              <GoogleLogin
                text="continue_with"
                shape="square"
                width={
                  document.getElementById("authButton")?.offsetWidth + "px"
                }
                // size="large"
                // width={document.getElementById('authButton')?.offsetWidth}
                theme="filled_black"
                onSuccess={(credentialResponse) => {
                  //   setcertificate(credentialResponse);
                  console.log(credentialResponse);
                  const prof: any = jwt_decode(
                    credentialResponse.credential
                      ? credentialResponse?.credential
                      : ""
                  );
                  setIsLoading(true);
                  Auth.login(
                    {
                      google_json: prof,
                    },
                    (res) => {
                      if (res.access_token) {
                        setIsLoading(false)
                        localStorage.setItem("accessToken", res.access_token);
                        navigate("/chat");
                      }
                    }
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
          </div>
          {/* </button> */}
        </div>
        <div
          style={{
            marginTop: "20px",
            marginRight: "auto",
            color: "#ffffff",
            fontSize: "16px",
            fontWeight: 300,
            paddingRight: "24px",
            paddingLeft: "24px",
            lineHeight: "24px",
            fontFamily:'Poppins-Regular',
            width: " -webkit-fill-available",
          }}
        >
          Already have an acoount?{" "}
          <a onClick={() => navigate('/login')} style={{ color: "#007BFF", cursor: "pointer" }}>Sign in</a>
          {/* <a className="text-primary dark:text-slate-200" href="">
                        Privacy Policy
                      </a> */}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Register;
