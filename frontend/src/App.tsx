import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Blogs from "./pages/Blogs";
import Publish from "./pages/Publish";
import { Provider } from "react-redux";
import { store } from "./redux/Store";
import { Blog } from "./pages/Blog";

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
					<Route
						path="/publish"
						element={<Publish />}
          ></Route>
          <Route
            path="/blog/:id"
            element={<Blog />}
          >
          </Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
