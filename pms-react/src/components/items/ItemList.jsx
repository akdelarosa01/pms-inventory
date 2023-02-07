import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import axiosClient from "../../axios-client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function ItemList() {
    const mySwal = withReactContent(Swal);
    const [items,setItems] = useState([]);
    const [columns, setColumns] = useState([]);
    const [pending, setPending] = useState(true);
    const page_link = "/items/";

    const [msg,setMsg] = useState({
        status: '',
        content: '',
    });

    const [processDelete, setProcessDelete] = useState(() => { return '' });

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
                // {
                //     cell: (row) => <button type="button" onClick={deleteItem(row.id)} className="btn btn-sm btn-danger">
                //         <i className="fa fa-trash"></i>
                //     </button>,
                //     ignoreRowClick: true,
                //     allowOverflow: true,
                //     button: true,
                //     name: '',
                //     width: '40px',
                //     selector: row => row.id,
                // },
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

    const [selectedData, setSelectedData] = useState([]);

    const handleSelectRow = (state) => {
        setSelectedData(state.selectedRows);
    };

    const deleteItem = (data_id) => {

        mySwal.fire({
            title: 'Do you want to delete these Items?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`,
        })
        .then((result) => {
            if (result.isConfirmed) {
                // axiosClient.delete('/items/'+ data_id)
                //     .then((response) => {
                //         console.log(response);
                //     })
                //     .catch((err) => {
                //         console.log(err);
                //     });
            } else if (result.isDenied) {
                Swal.fire("You chose not to delete the item.", "", "info");
            }
        });
    }

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between">
                <h4 className="card-title m-0">Item List</h4>
                <div>
                    <button type="button" className="btn btn-sm btn-danger" title="Please select/check an item then click this button to delete it." onClick={deleteItem}>
                        <i className="fa fa-trash"></i>
                    </button>
                </div>
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
                                onSelectedRowsChange={handleSelectRow}
                            />
                        </div>
                        
                    </div>
                </div>
                    
            </div>
        </div>

        
    );
}