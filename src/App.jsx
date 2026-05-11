import { useState , useRef , useEffect } from "react"
import ChartForm from "./components/ChartForm"
import ChatbotIcon from "./components/ChatbotIcon"
import ChatMessage from "./components/ChatMessage"
import { companyInfo } from "./companyInfo"
import WelcomePage from "./components/WelcomePage"

const App = () => {
  const [chatHistory, setChatHistory] = useState([{
    hideInChat: true,
    role: "model",
    text: companyInfo
  }]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef();

  const generateBotResponse = async (history) => {
    // Helper function to update chat history
    const updateHistory = (text, isError = false) => {
      setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), { role: "model", text, isError }]);
    }

    // Format the chat history for the API request
    history = history.map(({role,text}) => ({role, parts: [{text}]}));
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: history })

    }

    try{
      // Make the API call to get the bot's response
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();
      if(!response.ok) throw new Error(data.error.message || 'Something went wrong!');
      
      // Clean and update chat history with the bot's response
      const apiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, '$1').trim();
      updateHistory(apiResponse);



    } catch(error){
     updateHistory(error.message, true);

    }

  };

      useEffect(() => {
      // Scroll to the bottom of the chat body whenever chat history changes
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }, [chatHistory]);

  return (
    <div className={`container ${showChatbot ? 'show-chatbot' : ''}`}>
      <button onClick={() => setShowChatbot(prev => !prev)} id="chatbot-toggler">
        <span className="material-symbols-rounded">mode_comment
        </span>
        <span className="material-symbols-rounded">close
        </span>
      </button>
      <div className="chatbot-popup">
        {/* Chat Header Section */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">GIVbot</h2>
          </div>
          <button onClick={() => setShowChatbot(prev => !prev)} className="material-symbols-rounded">
            keyboard_arrow_down
          </button>
        </div>
        {/* Chat Body Section */}
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">Hello! How can I assist you today?
            </p>
          </div>
          {/* Render the chat history dynamically */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
       
        </div>
        {/* Chat Footer Section */}
        <div className="chat-footer">
         <ChartForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
        </div>
      </div>
      <>
        <WelcomePage />
      </>
    </div>
    
  )
}

export default App