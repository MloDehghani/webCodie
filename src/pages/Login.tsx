import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Please enter a valid email").required("Required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must contain 8 characters including uppercase, lowercase, number and special case character"
    )
    .required("Required"),
});
const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  // Form Validation
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
        console.log(values);
    },
  });
  const submitDisabled = Object.keys(formik.errors).length > 0 || !formik.dirty;
  return (
    <div
      style={{
        backgroundColor: "#121212",
        width: window.innerWidth,
        height: window.innerHeight,
        // overflowY: "scroll",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Poppins",
        // paddingLeft:'20px',
        // paddingRight:'20px'
      }}
    >
      <div style={{ paddingLeft: "18px", marginTop: "40px" }}>
        <img src="/icons/leftVector.svg" alt="leftArrow" />
      </div>
      <div style={{ marginTop: "-15px" }}>
        <p
          style={{
            color: "#FFFFFFDE",
            // width: 152,
            whiteSpace: "pre-line",
            paddingLeft: "24px",
            lineHeight: "40px",
            fontSize: "28px",
            fontWeight: "600",
          }}
        >
          Welcome {"\n"} Back!
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
            marginTop: "18px",
          }}
        >
          <label
            style={{
              fontWeight: "500",
              lineHeight: "24px",
              fontSize: "16px",
              marginBottom: "7px",
            }}
            htmlFor="email"
          >
            Your Email
          </label>
          <input
            {...formik.getFieldProps("email")}
            style={{
              padding: "12px 16px",
              backgroundColor: "#1F1F1F",
              border: "none",
              borderRadius: "4px",
            }}
            type="text"
            placeholder="Enter your email..."
          />
          {formik.errors.email && formik.touched.email && (
            <p
              style={{ color: "red", fontSize: "12px", marginTop: "3px" }}
           
            >
              {formik.errors.email}
            </p>
          )}
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
              fontWeight: "500",
              lineHeight: "24px",
              fontSize: "16px",
              marginBottom: "7px",
            }}
            htmlFor="email"
          >
            Password
          </label>
          <input
            {...formik.getFieldProps("password")}
            style={{
              padding: "12px 16px",
              backgroundColor: "#1F1F1F",
              border: "none",
              borderRadius: "4px",
            }}
            type="text"
            placeholder="Enter your password..."
          />
            {formik.errors.password && formik.touched.password && (
                      <p  style={{ color: "red", fontSize: "12px", marginTop: "3px" }}>
                        {formik.errors.password}
                      </p>
                    )}
        </div>
        <div
          style={{
            paddingRight: "23px",
            // paddingLeft: "24px",
            width: " -webkit-fill-available",
            textAlign: "right",
            marginTop: "8px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              backgroundColor: "#121212",
              lineHeight: "21.07px",
              fontSize: "14px",
              fontWeight: "400",
              color: "#007BFF",
              border: "none",
              cursor: "pointer",
            }}
          >
            Forget Password?
          </div>
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
            style={{
              marginBottom: "20px",
              width: "100%",
              backgroundColor: "#007BFF",
              height: "50px",
              borderRadius: "5px",
              lineHeight: "25.6px",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            Sign in
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "8px 0",
              width: "80%",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "25px",
            }}
          >
            <div
              style={{
                backgroundColor: "#8C8A93",
                opacity: ".87",
                height: "1px",
                width: "100%",
              }}
            ></div>{" "}
            {/* left line */}
            <div
              style={{
                color: "#FFFFFF",
                opacity: ".87",
                paddingLeft: "8px",
                paddingRight: "8px",

                fontWeight: "300",

                fontSize: "16px",
                lineHeight: "27.25px",
              }}
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
            ></div>{" "}
            {/* right line */}
          </div>
          {/* <div style={{ padding: "16px 30px", width: "100%" }}> */}
          <button
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50px",
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
            marginTop: "24px",
            marginRight: "auto",
            color: "#ffffff",
            fontSize: "16px",
            fontWeight: "500",
            paddingRight: "24px",
            paddingLeft: "24px",
            lineHeight: "24px",
            width: " -webkit-fill-available",
          }}
        >
          Don&apos;t have an acoount?{" "}
          <a style={{ color: "#007BFF", cursor: "pointer" }}>Sign up</a>
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
