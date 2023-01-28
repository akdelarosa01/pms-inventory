import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import itemTypeDataList from "../../data/data-item-type.json";
import DataTable from "react-data-table-component";

export default function ItemTypes() {
    const options = [
        { value: '', text: '--Choose an Item Type Category--', color: "color: #cfdce7"},
        { value: 'Material Type', text: 'Material Type', color: "color: #444444"},
        { value: 'Product Line', text: 'Product Line', color: "color: #444444"}
    ];

    const [itemTypes,setItemTypes] = useState(itemTypeDataList);
    const columns = [
        {
            cell: () => <Link to="/items" className="btn btn-sm btn-primary">
                <i className="far fa-edit"></i>
            </Link>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            name: '',
            width: '40px',
            selector: row => row.item_type,
        },
        {
            name: 'Category',
            width: '150px',
            sortable: true,
            selector: row => row.category,
        },
        {
            name: 'Item Type',
            width: '300px',
            sortable: true,
            selector: row => row.item_type,
        }
    ];

    return (
        <div className="card">
            <div className="card-header">
                <h4 className="card-title">Item Type Description </h4>
            </div>
            <div className="card-body">
                <form className="">

                    <div className="row">
                        <div className="col-6">
                            <div className="row mb-2">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <select className="form-control form-control-sm" id="category">
                                        {
                                            options.map( option => (
                                                <option key={option.value} value={option.value}>{option.text}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2">
                                    <label htmlFor="item" className="form-label">Item</label>
                                    <input type="text" className="form-control form-control-sm" id="item" />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-xs-12 mb-2">
                                    <button type="submit" className="btn btn-primary btn-sm w-100">Save</button>
                                </div>
                                <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-xs-12 mb-2">
                                    <button type="reset" className="btn btn-secondary btn-sm w-100">Reset</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-6">
                            <DataTable 
                                columns={columns} 
                                data={itemTypes} 
                                pagination 
                                selectableRows
                                responsive
                                striped
                                
                            />
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}