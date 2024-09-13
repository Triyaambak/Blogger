import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Blogs from "./pages/Blogs";
import { Provider } from "react-redux";
import { store } from "./redux/Store";

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={<Signin />}
					></Route>
					<Route
						path="/signup"
						element={<Signup />}
					></Route>
					<Route
						path="/blogs"
						element={<Blogs />}
					></Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
