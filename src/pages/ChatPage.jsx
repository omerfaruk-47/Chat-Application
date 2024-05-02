import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import Message from "../components/Message";

const ChatPage = ({ setRoom, room }) => {
  const [messages, setMessages] = useState([]);

  // mesaj gönderme fonksiyonu
  const sendMessage = async (e) => {
    e.preventDefault();

    // kolleksiyonun referansını alma
    const messagesCol = collection(db, "messages");

    // kollekisyona yeni döküman ekle
    await addDoc(messagesCol, {
      text: e.target[0].value,
      room,
      author: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(),
    });

    // formu sıfırla
    e.target.reset();
  };

  // mevcut odada gönderilen mesajları anlık olarak alır
  useEffect(() => {
    // kollekisyonun referansını al
    const messagesCol = collection(db, "messages");

    //sorgu ayarları oluşrmak

    const q = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );

    // onSnapshot fonksiyonunu çağırırken koleksiyon referansını geç
    onSnapshot(q, (snapshot) => {
      // verilerin geçici olarak tutulacağı boş dizi oluştur
      const tempMsg = [];

      // dökümanlar dön, verilerine eriş
      snapshot.docs.forEach((doc) => {
        tempMsg.push(doc.data());
      });

      // mesajları state'e aktar
      setMessages(tempMsg);
    });
  }, []);

  return (
    <div className="chat-page">
      <header>
        <p>{auth.currentUser?.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Farklı Oda</button>
      </header>
      <main>
        {messages.map((data, i) => (
          <Message data={data} key={i} />
        ))}
      </main>

      <form onSubmit={sendMessage}>
        <input type="text " required placeholder="Mesajınızı Yazınız..." />
        <button>Gönder</button>
      </form>
    </div>
  );
};

export default ChatPage;
