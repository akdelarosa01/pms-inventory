import {createBrowserRouter, Navigate } from "react-router-dom";

// Layouts
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";

import Dashboard from "./components/Dashboard";
import Login from "./components/auth/Login";
import NotFound from "./components/NotFound";
import ItemList from "./components/items/ItemList";
import ItemForm from "./components/items/ItemForm";


const router = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout />,
		children: [
			{
				path: "/",
				element: <Navigate to='/dashboard'/>
			},
			{
				path: "/dashboard",
				element: <Dashboard/>
			},
			{
				path: "/items",
				element: <ItemList/>
			},
			{
				path: "/items/create",
				element: <ItemForm/>
			},
			{
				path: "/items/:id",
				element: <ItemForm/>
			},
			// {
			// 	path: "/items/item-type",
			// 	element: <ItemTypeView/>
			// }
		]
	},
	{
		path: '/',
		element: <AuthLayout />,
		children: [
			{
				path: "/login",
				element: <Login />
			}
		]
	},
	
	
	{
		path: "*",
		element: <NotFound />
	}
]);

export default router;