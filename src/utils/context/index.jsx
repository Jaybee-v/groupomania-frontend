import React, { useState, createContext } from "react"

export const EditContext = createContext()

export const EditProvider = ({ children }) => {
    const [edit, setEdit] = useState("content")
    const toggleEdit = () => {
        setEdit(edit === "content" ? "edit" : "content")
        console.log(edit)
    }

    return (
        <EditContext.Provider value={{ edit, toggleEdit }}>
            {children}
        </EditContext.Provider>
    )
}
