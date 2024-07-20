import {CgBot, CgSpinner} from "react-icons/cg";
import {BiArrowBack, BiSend, BiUpload} from "react-icons/bi";
import {useState} from "react";
import axios from "axios";

const TextAi = ({handleShowFeaturePage}) => {
    const [chatList, setChatList] = useState([{role: "assistant", content: "Hello, may I know your symptoms?"}]);
    const [chat, setChat] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSendChat = () => {
        const newChatList = [{role: 'user', content: chat}, ...chatList];
        setChatList(newChatList);
        setChat("");
        handleSend(newChatList);
    }

    const handleSendChatOnKeyPress = (e) => {
        if (e.key === 'Enter') {
            const newChatList = [{role: 'user', content: chat}, ...chatList];
            setChatList(newChatList);
            setChat("");
            handleSend(newChatList);
        }
    }

    const handleSend = (chatList) => {
        setLoading(true);
        const tempList = chatList.toReversed();
        axios.post('http://localhost:5000/text_or_document_response', tempList, {params: {name: "User"}})
            .then(res => {
                setChatList(prevState => [{role: 'assistant', content: res.data.message}, ...prevState]);
                setLoading(false);
            });
    }

    return (
        <>
            <div
                className="bg-white flex flex-col p-1 rounded-2xl border-2 shadow-2xl border-gray-600 w-[25rem] h-[30rem]">
                <div className="flex justify-between border-b items-center border-gray-200 p-1 gap-2">
                    <div className="flex items-center gap-2">
                        <div className="p-2 border border-gray-200 rounded-full w-10 h-10">
                        <span className="flex justify-center items-center text-2xl text-red-600">
                            <CgBot/>
                        </span>
                        </div>
                        <h1 className="text-xl font-normal">Diagnosis Bot</h1>
                    </div>
                    <button onClick={handleShowFeaturePage} className="text-2xl hover:text-gray-500 p-1">
                        <BiArrowBack/>
                    </button>
                </div>
                <div className="flex-grow flex flex-col">
                    <div className="flex flex-col-reverse h-[23.3rem] p-1 overflow-scroll gap-1">
                        {loading && <div
                            className={`flex w-full items-center justify-start gap-1`}>
                            <div
                                className="min-w-10 min-h-10 rounded-full bg-white border border-gray-200 flex justify-center items-center">
                                <CgBot/>
                            </div>
                            <span
                                className={`bg-gray-200 overflow-clip flex justify-center items-center text-wrap p-2 min-w-24 max-w-52 rounded-2xl`}><span
                                className="animate-spin"><CgSpinner/></span></span>
                        </div>}
                        {chatList.map((message, index) => (
                            <div key={index}
                                 className={`flex w-full items-center ${message.role === 'user' ? 'justify-end' : 'justify-start'} gap-1`}>
                                {message.role === 'assistant' && <div
                                    className="min-w-10 min-h-10 rounded-full bg-white border border-gray-200 flex justify-center items-center">
                                    <CgBot/>
                                </div>}
                                <span
                                    className={`${message.role === 'user' ? 'bg-amber-500' : 'bg-gray-200'} overflow-clip text-wrap p-2 min-w-24 max-w-52 rounded-2xl`}>{message.content}</span>
                            </div>
                        ))}
                    </div>
                    <div
                        className="flex border p-2 focus-within:border focus-within:border-amber-500 border-gray-400 m-1 rounded-md overflow-clip">
                        <label htmlFor="upload"
                               className="hover:text-gray-500 mr-1.5 hover:cursor-pointer flex items-center"><BiUpload/></label>
                        <input id="upload" type="file" className="hidden"/>
                        <input type="text"
                               onKeyDown={handleSendChatOnKeyPress}
                               value={chat}
                               onChange={e => setChat(e.target.value)}
                               placeholder="Enter text here..."
                               className=" w-full"/>
                        <button onClick={handleSendChat} className="hover:text-gray-500"><BiSend/></button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TextAi;