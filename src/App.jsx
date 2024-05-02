import { useState } from "react";
import AuthPage from "./pages/AuthPage";
import RoomPage from "./pages/RoomPage";
import ChatPage from "./pages/ChatPage";

const App = () => {
  //kullanıcının seçtiği oda
  const [room, setRoom] = useState(null);

  //kullanıcının yetkisi var mı?
  const [isAuth, setİsAuth] = useState(localStorage.getItem("token"));

  //yetkisi yoksa > giriş sayfası
  if (!isAuth) {
    return <AuthPage setİsAuth={setİsAuth} />;
  }

  //yetkisi varsa sohbet seçme odasına  yönlendir
  return (
    <div className="container">
      {!room ? (
        //oda seçildiyse > oda seçme sayfası
        <RoomPage setRoom={setRoom} setİsAuth={setİsAuth} />
      ) : (
        //oda seçildiyse  > sohbet sayfasına
        <ChatPage room={room} setRoom={setRoom} />
      )}
    </div>
  );
};

export default App;
