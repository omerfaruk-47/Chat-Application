import { provider, auth } from "../firebase/config";
import { signInWithPopup } from "firebase/auth";

const AuthPage = ({ setİsAuth }) => {
  //giriş butununa tıklanırsa
  const handleClick = () => {
    signInWithPopup(auth, provider)
      // başarıyla giriş yaparsa çalışır
      .then((data) => {
        console.log(data.user);

        // kullanıcnı yetkisini true'ya çek
        setİsAuth(true);

        // kullanıcı bilgisini local'de sakla
        localStorage.setItem("token", data.user.refreshToken);
      });
  };

  return (
    <div className="container">
      <div className="auth">
        <h1>Chat Room</h1>
        <p>Devam Etmek İçin Giriş Yapın</p>
        <button onClick={handleClick}>
          <img src="/g-logo.png" alt="" />
          <span>Google İle Gir</span>
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
