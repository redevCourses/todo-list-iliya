import { useEffect, useState } from "react"

const withLogger = (Component) => {
    return ({ todos, setTodos, config, alertWindow, showAlert, messages, setMessages }) => {
        const correctDate = (date) => {
            const hours = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`
            const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`
            const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : `${date.getSeconds()}`
            return `${hours}:${minutes}:${seconds}`
        }

        const addMessage = (title) => {

            const message = `${correctDate(new Date())}: Добавлена запись: ${title}`

            console.log(`${message}`);
            setMessages([...messages, message])
        }
        const toggleMessage = (title) => {

            const message = `${correctDate(new Date())}: Выполнена запись: ${title}`

            console.log(message);
            setMessages([...messages, message])
        }
        const editMessage = (title) => {

            const message = `${correctDate(new Date())}: Изменена запись: ${title}`

            console.log(message);
            setMessages([...messages, message])
        }
        const editingMessage = (title) => {

            const message = `${correctDate(new Date())}: Редактируется запись: ${title}`

            console.log(message);
            setMessages([...messages, message])
        }
        const removeMessage = (title) => {

            const message = `${correctDate(new Date())}: Удалена запись: ${title}`

            console.log(message);
            setMessages([...messages, message])
        }
        const activateMessage = (title) => {

            const message = `${correctDate(new Date())}: Активна запись: ${title}`

            console.log(message);
            setMessages([...messages, message])
        }

        useEffect(() => {
            localStorage.setItem('messages', JSON.stringify(messages))
        }, [messages])

        const clearStorage = () => {
            setMessages([])
        }

        return <Component
            alertWindow={alertWindow}
            config={config}
            showAlert={showAlert}
            todos={todos}
            setTodos={setTodos}
            addMessage={addMessage}
            toggleMessage={toggleMessage}
            editMessage={editMessage}
            removeMessage={removeMessage}
            activateMessage={activateMessage}
            editingMessage={editingMessage}
            messages={messages}
            clearStorage={clearStorage}
        />
    }
}

export default withLogger;