import { Link } from "react-router-dom";
import ItemList from "../../components/items/ItemList";


export default function Items() {
    return (
        <div className="page-wrapper">
            <div className="page-content-tab">

                <div className="container-fluid">

                    <div className="row">
                        <div className="col-sm-12">

                            <div className="page-title-box">
                                <div className="row">
                                    <div className="col align-self-center">
                                        <h4 className="page-title pb-md-0">Items</h4>
                                    </div>
                                    <div className="col-auto align-self-center">
                                        <Link to="/items/add-item" className="btn btn-sm btn-outline-primary">
                                            Item Form
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-sm-12">
                            <ItemList/>
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>
    )
}