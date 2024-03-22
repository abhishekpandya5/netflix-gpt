import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removerUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get user from store
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removerUser());
        navigate("/");
      }
    });

    // unsubscribe when user is logout
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleGptClick = () => {
    dispatch(toggleGptSearchView());
  };

  return (
    <header className="flex justify-between items-center w-full absolute px-8 py-2 bg-gradient-to-b from-black z-20 text-white">
      <Link to="/">
        <img className="w-44" src={LOGO} alt="logo" />
      </Link>

      {user && (
        <>
          <h2>Hi, {user.displayName}</h2>
          <div className="flex gap-2">
            <button
              onClick={handleGptClick}
              className="py-2 px-4 mx-4 bg-purple-800 text-white rounded-md"
            >
              {!showGptSearch ? "GPT Search" : "Browse Content"}
            </button>
            <img alt="user-icon" src={user.photoURL} className="w-12 h-12" />
            <button
              onClick={handleSignout}
              className="w-fit h-12 p-2  font-bold"
            >
              Signout
            </button>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
