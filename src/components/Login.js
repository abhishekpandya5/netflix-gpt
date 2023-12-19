import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignInToggle = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        // const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: name.current.value,
          photoURL: "https://avatars.githubusercontent.com/u/30802411?v=4",
        })
          .then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({ uid, email, displayName, photoURL }));
            navigate("/browse");
          })
          .catch((error) => {
            setErrorMessage(error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("user: ", user);
        navigate("/browse");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
        console.error("errorCode: ", errorCode);
        console.error("errorMessage: ", errorMessage);
      });
  };

  const handleButtonClick = () => {
    // validate form data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    // SignIn/SignUp logic
    if (isSignInForm) {
      handleSignIn();
    } else {
      handleSignUp();
    }
  };

  return (
    <div>
      <Header />
      <div className="background absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/b4c7f092-0488-48b7-854d-ca055a84fb4f/5b22968d-b94f-44ec-bea3-45dcf457f29e/IN-en-20231204-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="background"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="login-signup-from w-3/12 p-12 my-36 mx-auto right-0 left-0 bg-black absolute text-white bg-opacity-80 rounded-sm"
      >
        <h1 className="text-3xl font-semibold mb-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            ref={name}
            placeholder="Full Name"
            className="p-2 mx-0 my-2 rounded-sm bg-gray-700 border-none w-full outline-none"
          />
        )}
        <input
          type="text"
          placeholder="Email"
          ref={email}
          className="p-2 mx-0 my-2 rounded-sm bg-gray-700 border-none w-full outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          ref={password}
          className="p-2 mx-0 my-2 rounded-sm bg-gray-700 border-none w-full outline-none"
        />
        <p className="text-red font-bold py-2">{errorMessage}</p>
        <button
          onClick={handleButtonClick}
          className="p-2 mx-0 my-4 bg-red rounded-sm w-full"
        >
          {isSignInForm ? "Sign In" : "Sign up"}
        </button>

        <p onClick={handleSignInToggle}>
          {isSignInForm ? (
            <span>
              New to Netflix?{" "}
              <span className="font-bold cursor-pointer">Sign up</span> now
            </span>
          ) : (
            <span>
              Already a member?{" "}
              <span className="font-bold cursor-pointer">Sign in</span>
            </span>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
