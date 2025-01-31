import { useState,useEffect } from "react";
import "./style.css";
import { io } from "socket.io-client";
const socket = io("http://localhost:3001");



export default function Home() {
  const [room,setRoom] = useState<string>("");
  const [message,setMessage] = useState<string>();
  const [reciveMessage,setReciveMessage] = useState<string[]>([]);
console.log(reciveMessage);



  const sendMessage =()=>{
    socket.emit("oneToOneMessage",message)
    setMessage("")
  }


  const joinRoom = () => {
    const trimmedRoom = room.trim();

    if (trimmedRoom !== "" && trimmedRoom !== joinedRoom) {
      socket.emit("join_room", trimmedRoom);
    }
  };

  useEffect(() => {
    const handleMessageReceive = (data: string) => {
      console.log("Received:", data);
      setReciveMessage((prevMessages) => {
        if (!prevMessages.includes(data)) {
          return [...prevMessages, data];
        }
        return prevMessages;
      });
    };

    socket.on("reciveMessage", handleMessageReceive);

    return () => {
      socket.off("reciveMessage", handleMessageReceive); 
    };
  }, [])
  
  return (
    <>
    <div className="homePage">
      <div className="mainChatBox">

        <div className="inputBox">
          <p>Room: {room} </p>
          <input type="text" placeholder="Room Number" value={room} onChange={(e)=>setRoom(e.target.value)} />
          <div className="btn" onClick={joinRoom}>
          <p>Join</p>
        </div>
        </div>

<div className="chatBox">
  {
    reciveMessage?.map((el,i)=>(
      <p key={i}>{el}</p>
    ))
  }

</div>

        <div className="inputBox">
          <p>Message</p>
          <textarea placeholder="Enter message" value={message} onChange={(e)=>setMessage(e.target.value)}/>
        </div>

        <div className="btn" onClick={sendMessage}>
          <p>Send</p>
        </div>


      </div>

    </div>
    </>
  )
}
