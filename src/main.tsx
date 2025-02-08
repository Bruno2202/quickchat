import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import './index.css'
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import UserProvider from "./contexts/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import SocketProvider from "./contexts/SocketContext";
import ModalProvider from "./contexts/ModalContext";
import ChatProvider from "./contexts/ChatContext";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
	<ModalProvider>
		<UserProvider>
			<SocketProvider>
				<ChatProvider>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Login />} />
							<Route
								path="/home"
								element={
									<ProtectedRoute>
										<Home />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/:id"
								element={
									<Home />
								}
							/>
						</Routes>
						<Toaster
							position="top-center"
							reverseOrder={false}
							toastOptions={{
								duration: 2000,
								style: {
									backgroundColor: "white",
									fontFamily: "'Kumbh Sans'",
									fontWeight: "500",
									color: 'black',
									borderRadius: '8px'
								},
							}}
						/>
					</BrowserRouter>
				</ChatProvider>
			</SocketProvider>
		</UserProvider>
	</ModalProvider>
);
