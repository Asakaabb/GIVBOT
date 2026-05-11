import { useRef } from "react";

const ChartForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
    const inputRef = useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;
        inputRef.current.value = "";

        // Update chat history with the new user message
        setChatHistory(history => [...history, { role: "user", text: userMessage }]);

        // Simulate a bot response after a short delay
        setTimeout(() => {
            setChatHistory(history => [...history, { role: "model", text: "Thinking..." }]);

            // Call the function to generate the bot's response
            generateBotResponse([...chatHistory, { role: "user", text: `Using the details provided above, please address this query:${userMessage}` }]);
        }, 400);

    };



    return (
        <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
            <input ref={inputRef} type="text" placeholder="Message..." className="message-input" required />
            <button className="material-symbols-rounded">arrow_upward
            </button>
        </form>


    )
};

export default ChartForm