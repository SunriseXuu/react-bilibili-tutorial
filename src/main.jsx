import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// 在html的root div上注册React根
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
