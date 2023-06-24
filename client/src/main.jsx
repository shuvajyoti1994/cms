import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import 'antd/dist/react.css'
import { Provider } from 'react-redux'
import store from './redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
)
