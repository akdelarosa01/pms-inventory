import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axiosClient from "../../axios-client";

export default function ItemList() {
    const [items,setItems] = useState([]);
    const [columns, setColumns] = useState([]);
    const [pending, setPending] = useState(true);
    const page_link = "/items/add-item/";

    useEffect( () => {
        axiosClient.get('/items')
        .then(({data}) => {
            setItems(data);
        })
        .catch((err) => {
            console.log(err)
        });

        const timeout = setTimeout( () => {
            setColumns([
                {
                    cell: (row) => <Link to={page_link + row.id} className="btn btn-sm btn-primary">
                        <i className="far fa-edit"></i>
                    </Link>,
                    ignoreRowClick: true,
                    allowOverflow: true,
                    button: true,
                    name: '',
                    width: '40px',
                    selector: row => row.id,
                },
                {
                    name: 'Item Code',
                    width: '150px',
                    sortable: true,
                    selector: row => row.item_code,
                },
                {
                    name: 'Description',
                    width: '300px',
                    sortable: true,
                    selector: row => row.item_desc,
                },
                {
                    name: 'Category',
                    width: '140px',
                    sortable: true,
                    selector: row => row.item_category,
                },
                {
                    name: 'Item Type',
                    width: '200px',
                    sortable: true,
                    selector: row => row.item_type,
                },
                {
                    name: 'Item',
                    width: '200px',
                    sortable: true,
                    selector: row => row.item,
                },
                {
                    name: 'Schedule / Class',
                    width: '150px',
                    sortable: true,
                    selector: row => row.schedule_class,
                },
                {
                    name: 'Alloy',
                    sortable: true,
                    selector: row => row.alloy,
                },
                {
                    name: 'Size',
                    sortable: true,
                    width: '150px',
                    selector: row => row.size,
                },
                {
                    name: 'Weight',
                    sortable: true,
                    selector: row => row.weight,
                },
                {
                    name: 'Cut Weight',
                    width: '120px',
                    sortable: true,
                    selector: row => row.cut_weight,
                },
                {
                    name: 'Cut Length',
                    width: '120px',
                    sortable: true,
                    selector: row => row.cut_length,
                },
                {
                    name: 'Cut Width',
                    width: '120px',
                    sortable: true,
                    selector: row => row.cut_width,
                },
                {
                    name: 'Std. Material Used',
                    width: '180px',
                    sortable: true,
                    selector: row => row.std_material_used,
                },
                {
                    name: 'Finished Code',
                    width: '150px',
                    sortable: true,
                    selector: row => row.finished_code,
                },
                {
                    name: 'Finished Description',
                    width: '280px',
                    sortable: true,
                    selector: row => row.finished_desc,
                },
                {
                    name: 'Updated By',
                    width: '150px',
                    sortable: true,
                    selector: row => row.update_user,
                },
                {
                    name: 'Updated at',
                    width: '180px',
                    sortable: true,
                    selector: row => row.updated_at,
                },
            ]);

            setPending(false);
        }, 2000);

        return () => clearTimeout(timeout);

    },[]);

    return (
        <div className="card">
            <div className="card-header">
                <h4 className="card-title">Item list </h4>
            </div>
            <div className="card-body">

                <div className="row">
                    <div className="col-sm-12">

                        <div className="table-responsive">
                            <DataTable 
                                columns={columns} 
                                data={items} 
                                progressPending={pending}
                                pagination 
                                selectableRows
                                responsive
                                striped
                            />
                        </div>
                        
                    </div>
                </div>
                    
            </div>
        </div>

        
    );
}