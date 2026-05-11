import ChatbotIcon from "./ChatbotIcon"

const ChatMessage = ({ chat }) => {
    return (
        !chat.hideInChat && (
            <div className={`message ${chat.role === "model" ? 'bot' : 'user'}-message ${chat.isError ? 'error' : ''}`}>
                {/* Adding the chatbot icon only if the chat's role is "model" */}
                {chat.role === "model" && <ChatbotIcon />}
                <p className="message-text">
                    {chat.text}
                </p>
            </div>
        )
    )
}

export default ChatMessage