import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_IMG_URL, DICTIONARY, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
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
          photoURL: USER_AVATAR,
        })
          .then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({ uid, email, displayName, photoURL }));
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
        // const user = userCredential.user;
        // console.log("user: ", user);
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
        <img src={BG_IMG_URL} alt="background" />
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
          className="p-2 mx-0 my-4 bg-red-color rounded-sm w-full"
        >
          {isSignInForm ? DICTIONARY.SIGN_IN : DICTIONARY.SIGN_UP}
        </button>

        <p onClick={handleSignInToggle}>
          {isSignInForm ? (
            <span>
              {DICTIONARY.NEW_MEMBER_MSG}{" "}
              <span className="font-bold cursor-pointer">
                {DICTIONARY.SIGN_UP}
              </span>{" "}
              now
            </span>
          ) : (
            <span>
              {DICTIONARY.ALREADY_MEMBER_MSG}{" "}
              <span className="font-bold cursor-pointer">
                {DICTIONARY.SIGN_IN}
              </span>
            </span>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
