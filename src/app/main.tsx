// utils
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

const rootElement = document.querySelector("#root")

if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(
	<React.StrictMode>
		<h1>Привет</h1>
		<App />
	</React.StrictMode>
)
