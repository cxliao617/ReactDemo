import React from 'react'
import HeaderBar from './components/HeaderBar'
import {HashRouter, Routes,Route } from 'react-router-dom'
import './index.css'
import  TodoPage  from './pages/TodoPage'
import HomePage from './pages/HomePage'

function App() {
    return (
    <div className="App">
        <HashRouter> 
        <HeaderBar />
        <div className="p-grid">
            <div className="p-col-3" />
            <div className="p-col-6">
            <Routes>
                <Route path="/todo" element={<TodoPage />} />
                <Route path="/" element={<HomePage />} />
            </Routes>
            </div>
            <div className="p-col-3" />
        </div>
        </HashRouter>
        
    </div>)
}

export default App
