const RoomPage = ({ setRoom, setİsAuth }) => {
  //form gönderince tetilklenecek
  const handleSubmit = (e) => {
    e.preventDefault();

    //inputtaki değeri al
    const room = e.target[0].value;

    //kullanıcı seçtiğin odayı state aktar
    setRoom(room.toLowerCase());
  };

  return (
    <form onSubmit={handleSubmit} className="room-page">
      <h1>Chat Room</h1>

      <p>Hangi Odaya Gireceksiniz</p>

      <input type="text" placeholder="ör:whatsapp,my chat..." />
      <button type="submit">Odaya Gir</button>
      <button
        onClick={() => {
          //Yetki state'ini false çekerek oda logine yönlendir
          setİsAuth(false);
          //localdeki kaydı kaldır
          localStorage.removeItem("token");
        }}
        type="button"
      >
        Çıkış Yap
      </button>
    </form>
  );
};

export default RoomPage;
