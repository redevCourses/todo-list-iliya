import { useState } from "react"

const checkAuth = (Todo) => {
    return (props) => {

        const [messages, setMessages] = useState(JSON.parse(localStorage.getItem('messages')) || [])
        const token = localStorage.getItem('token')
        if (token) {
            return <Todo {...props} token={token} messages={messages} setMessages={setMessages}/>
        } else {
            <p>Please log in to access this content.</p>
        }
    }
}
export default checkAuth