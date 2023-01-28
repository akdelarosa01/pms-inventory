import {createBrowserRouter, Navigate} from "react-router-dom";

// Layouts
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";

// Items
import ItemsView from "./views/items/ItemsView";
import AddItemsView from "./views/items/AddItemsView";
import ItemTypeView from "./views/items/ItemTypeView";
// import Users from "./views/masters/Users";
// import Suppliers from "./views/masters/Suppliers";
// import Warehouses from "./views/masters/Warehouses";

// // Inventories
// import InventoryIn from "./views/inventories/InventoryIn";
// import InventoryChange from "./views/inventories/InventoryChange";
// import InventoryTransfer from "./views/inventories/InventoryTransfer";

// // Sales
// import SalesOrder from "./views/sales/SalesOrder";

// // Others
import NotFound from "./views/NotFound";
import Dashboard from "./views/Dashboard";
import Login from "./views/auth/Login";



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
				element: <ItemsView/>
			},
			{
				path: "/items/add-item",
				element: <AddItemsView/>
			},
			{
				path: "/items/item-type",
				element: <ItemTypeView/>
			}
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