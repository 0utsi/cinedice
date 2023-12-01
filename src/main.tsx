import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GetRandomMovieProvider } from './providers/ApiContext.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
	<GetRandomMovieProvider>
    <App />
	</GetRandomMovieProvider>
  </React.StrictMode>,
)
