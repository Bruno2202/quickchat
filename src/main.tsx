import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import './index.css'
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/home" element={<Home />} />
			<Route path="/home/:id" element={<Home />} />
		</Routes>
		<Toaster
			position="top-center"
			reverseOrder={false}
		/>
	</BrowserRouter>
);
