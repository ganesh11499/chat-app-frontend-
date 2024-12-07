import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../home/redux/Store";
import socket, {
  connectSocket,
  onReceiveMessage,
  sendMessage,
} from "../home/socket";
import { MdSend } from "react-icons/md";
import axios from "axios";

interface SelectedUserData {
  id: number;
  userName: string;
  email: string;
}

interface SelectedUserProps {
  selectedUserData: SelectedUserData | null;
}

const RightSide: React.FC<SelectedUserProps> = ({ selectedUserData }) => {
  const { isAuth, user }: any = useSelector((state: RootState) => state.auth);
  const [chat, setChat] = useState<{ senderId: string; message: string }[]>([]);
  const [message, setMessage] = useState<string>("");

  //Socket io connection
  useEffect(() => {
    connectSocket(user.id.toString());

    onReceiveMessage((payload) => {
      setChat((prev) => [...prev, payload]);
    });

    return () => {
      socket.disconnect();
    };
  }, [user.id]);

  

  //Send msg function and 
  const handleSend = async () => {
    if (message.trim()) {
      if (selectedUserData?.id) {
        const newMessage = { senderId: user.id.toString(), message };
        setChat((prev) => [...prev, newMessage]);
        sendMessage(
          user.id.toString(),
          (selectedUserData?.id).toString(),
          message
        );
        setMessage("");

        const payload = {
          content: message.trim(),
          senderId: user.id.toString(),
          recipientId: selectedUserData.id.toString(),
        };

        const res = await axios.post("http://localhost:3500/message", payload);

        if (res?.status === 201) {
          console.log("Message sent successfully:", res.data);
        }
      }
    }
  };

  


  //Get all messsag api 
  const getAllMessages = async () => {
    const res = await axios.get(`http://localhost:3500/message?senderId=${user.id}&recipientId=${selectedUserData?.id}`)

    if(res.status == 200){
      res?.data?.map((item: any) => {
        item.message = item.content
      });
      setChat(res.data)
    }else {
      setChat([])
    }
  }

  useEffect(() => {
    if(user.id && selectedUserData?.id) {
    getAllMessages()
  }
  },[user.id, selectedUserData?.id])


  return (
    <>
      {selectedUserData?.userName ? (
        <div className="w-[70%]">
          {/*User Data  */}
          <div className="bg-white flex space-x-6 px-2 py-2">
            <div className="avatar offline">
              <div className="w-14 rounded-full">
                <img
                  src={
                    "data:image/jpeg;base64,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"
                  }
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <h1 className="font-medium text-lg text-gray-800">
                {selectedUserData?.userName}
              </h1>
            </div>
          </div>
          {/*User Data  */}

          <hr className="mt-3"></hr>

          {/* Messages */}
          <div className="bg-slate-100 h-[78vh] p-4 overflow-y-scroll">
            {chat.map((msg, index) => (
              <p
                key={index}
                style={{
                  textAlign: msg.senderId == user.id ? "right" : "left",
                }}
              >
                {/* {msg.message} */}
                <div
                  className={`chat ${
                    msg.senderId == user.id ? "chat-end" : "chat-start"
                  }`}
                >
                  <div
                    className={`chat-bubble ${
                      msg.senderId == user.id
                        ? "bg-green-400 text-black"
                        : "bg-white text-black"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>

                {/* <div className="chat chat-start">
                  <div className="chat-bubble chat-bubble-error">
                    {" "}
                    {msg.message}
                  </div>
                </div> */}
              </p>
            ))}
          </div>
          {/* Messages */}

          {/* Type input feild */}
          <div className="mt-3 flex text-center">
            <div className="px-2  w-[70%]">
              <input
                type="text"
                placeholder="Type here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-[100%] h-10 border-2 border-b-slate-400 border-l-slate-100 border-r-slate-100 border-t-slate-100 focus:border-b-slate-500 hover:border-b-slate-500 outline-none rounded-lg"
              />
            </div>
            <button
              className="mt-1 btn btn-sm border-t-neutral-400"
              onClick={handleSend}
            >
              <MdSend />
            </button>
          </div>
          {/* Type input feild */}
        </div>
      ) : (
        <div className="text-2xl text-red-500 mx-auto">
          Click the user and start the chat and enjoy the day...
        </div>
      )}
    </>
  );
};

export default RightSide;
