import React from "react"
import { AppProvider } from './context'
import Form from "./components/DetailForm"
function App() {

  return (
    <AppProvider>
    <Form/>
    </AppProvider>
  )
}

export default App
