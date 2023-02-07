import { useEffect, useRef, useState } from "react";
import axiosClient from "../../axios-client";
import Messages from "../Messages";
import { useParams } from "react-router-dom";



export default function ItemForm() {
    const options = [
        { value: '', text: '--Choose an Item Category--', color: "color: #cfdce7"},
        { value: 'RAW MATERIAL', text: 'Raw Material', color: "color: #444444"},
        { value: 'FINISHED GOODS', text: 'Finished Goods', color: "color: #444444"},
        { value: 'CRUDE', text: 'Crude', color: "color: #444444"}
    ];

    const [selected, setSelected] = useState(options[0].value);
    const [errors,setErrors] = useState(null);
    const [disable, setDisabled] = useState(true);
    const [msg,setMsg] = useState({
        status: '',
        content: '',
    });

    const handleChange = (ev) => {
        setSelected(ev.target.value);
        changeItemCategoryView(ev.target.value);
    }

    const changeItemCategoryView = (item_category_value) => {
        const materials = document.querySelectorAll('.materials');
        const product = document.querySelector('.product');
        const crudes = document.querySelectorAll('.crude');
        const checker = ["CRUDE", "FINISHED GOODS"];

        setDisabled(true);
        if (item_category_value != "") {
            setDisabled(false);
        }
        

        if (!checker.includes(item_category_value)) {
            // Materials
            product.style.display = "none";
            materials.forEach( (material) => {
                material.classList.remove("col-xl-4","col-lg-4");
                material.classList.add("col-xl-6","col-lg-6");
            });
        } else {
            // Produtcs
            materials.forEach( (material) => {
                material.classList.remove("col-xl-6", "col-lg-6");
                material.classList.add("col-xl-4","col-lg-4");
            });
            product.style.display = "block";

            if (item_category_value == "CRUDE") {
                crudes.forEach( (crude) => {crude.style.display = "block"})
            } else {
                crudes.forEach( (crude) => {crude.style.display = "none"})
            }
        }
    }

    const clearForm = () => {
        document.getElementById("frmItem").reset();
    }

    const id_ref = useRef();
    const item_category_ref = useRef();
    const item_type_ref = useRef();
    const item_code_ref = useRef();
    const item_desc_ref = useRef();
    const item_ref = useRef();
    const schedule_class_ref = useRef();
    const alloy_ref = useRef();
    const size_ref = useRef();
    const weight_ref = useRef();
    const cut_weight_ref = useRef();
    const cut_length_ref = useRef();
    const cut_width_ref = useRef();
    const std_material_used_ref = useRef();
    const finished_code_ref = useRef();
    const finished_desc_ref = useRef();

    const onSave = (ev) => {
        ev.preventDefault();

        const item_data = {
            id: id_ref.current.value,
            item_category: item_category_ref.current.value,
            item_type: item_type_ref.current.value,
            item_code: item_code_ref.current.value,
            item_desc: item_desc_ref.current.value,
            item: item_ref.current.value,
            schedule_class: schedule_class_ref.current.value,
            alloy: alloy_ref.current.value,
            size: size_ref.current.value,
            weight: weight_ref.current.value,
            cut_weight: cut_weight_ref.current.value,
            cut_length: cut_length_ref.current.value,
            cut_width: cut_width_ref.current.value,
            std_material_used: std_material_used_ref.current.value,
            finished_code: finished_code_ref.current.value,
            finished_desc: finished_desc_ref.current.value,
        }

        setErrors(null);

        if (item_data.id !== null && item_data !== "") {
            axiosClient.put('/items/'+item_data.id, item_data)
                .then(({data}) => {
                    clearForm();
                    setMsg(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            axiosClient.post('/items', item_data)
                .then(({data}) => {
                    clearForm();
                    setMsg(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    let {id} = useParams();
    
    
    useEffect( () => {
        if (id != null) {
            axiosClient.get('/items/'+id)
                .then(({data}) => {
                    console.log(data);
                    
                    if (data != null && data.hasOwnProperty('id')) {
                        let frmItem = document.getElementById('frmItem');

                        changeItemCategoryView(data.item_category);
                        frmItem.item_category.value = data.item_category;
                        frmItem.item_category.disabled = true;

                        switch (data.item_category) {
                            case "RAW MATERIAL":
                                frmItem.id.value = data.id;
                                frmItem.item_type.value = data.item_type;
                                frmItem.item_code.value = data.item_code;
                                frmItem.item_desc.value = data.item_desc;
                                frmItem.item.value = data.item;
                                frmItem.schedule_class.value = data.schedule_class;
                                frmItem.alloy.value = data.alloy;
                                frmItem.size.value = data.size;
                                frmItem.weight.value = data.weight;
                                break;
                            case "FINISHED GOODS":
                                frmItem.id.value = data.id;
                                frmItem.item_type.value = data.item_type;
                                frmItem.item_code.value = data.item_code;
                                frmItem.item_desc.value = data.item_desc;
                                frmItem.item.value = data.item;
                                frmItem.schedule_class.value = data.schedule_class;
                                frmItem.alloy.value = data.alloy;
                                frmItem.size.value = data.size;
                                frmItem.weight.value = data.weight;
                                frmItem.cut_weight.value = data.cut_weight;
                                frmItem.cut_length.value = data.cut_length;
                                frmItem.cut_width.value = data.cut_width;
                                frmItem.std_material_used.value = data.std_material_used;
                                break;
                            default:
                                frmItem.id.value = data.id;
                                frmItem.item_type.value = data.item_type;
                                frmItem.item_code.value = data.item_code;
                                frmItem.item_desc.value = data.item_desc;
                                frmItem.item.value = data.item;
                                frmItem.schedule_class.value = data.schedule_class;
                                frmItem.alloy.value = data.alloy;
                                frmItem.size.value = data.size;
                                frmItem.weight.value = data.weight;
                                frmItem.cut_weight.value = data.cut_weight;
                                frmItem.cut_length.value = data.cut_length;
                                frmItem.cut_width.value = data.cut_width;
                                frmItem.std_material_used.value = data.std_material_used;
                                frmItem.finished_code.value = data.finished_code;
                                frmItem.finished_desc.value = data.finished_desc;
                                break;
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });

    

    return (
        <div className="card">
            <div className="card-header">
                <h4 className="card-title">Item Details</h4>
            </div>
            <div className="card-body">

                <Messages status={msg.status} content={msg.message}/>

                <form className="" onSubmit={onSave} id="frmItem">

                    <div className="row mb-2">
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12 materials">
                            <div className="row">
                                <div className="col-md-4 mb-2">
                                    <label htmlFor="item_category" className="form-label">Item Category</label>
                                    <input type="hidden" id="id" name="id" ref={id_ref}/>
                                    <select className="form-control form-control-sm" id="item_category" name="item_category" value={selected} ref={item_category_ref} onChange={handleChange}>
                                        {
                                            options.map( option => (
                                                <option key={option.value} value={option.value}>{option.text}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <label htmlFor="item_type" className="form-label">Item Type</label>
                                    <input type="text" className="form-control form-control-sm" id="item_type" name="item_type" ref={item_type_ref} title="Material Type / Product Line" disabled={disable}/>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <label htmlFor="item_code" className="form-label">Item Code</label>
                                    <input type="text" className="form-control form-control-sm" id="item_code" name="item_code" ref={item_code_ref} disabled={disable}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <label htmlFor="item_desc" className="form-label">Description</label>
                                    <textarea id="item_desc" name="item_desc" className="form-control form-control-sm" rows="5" style={{resize:"none"}} ref={item_desc_ref} disabled={disable}></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12 materials">
                            <div className="row">
                                <div className="col-12 mb-2">
                                    <label htmlFor="item" className="form-label">Item</label>
                                    <input type="text" className="form-control form-control-sm" id="item" name="item" ref={item_ref} disabled={disable}/>
                                </div>

                                <div className="col-12 mb-2">
                                    <label htmlFor="schedule_class" className="form-label">Schedule / Class</label>
                                    <input type="text" className="form-control form-control-sm" id="schedule_class" name="schedule_class" ref={schedule_class_ref} disabled={disable}/>
                                </div>

                                <div className="col-4 mb-2">
                                    <label htmlFor="alloy" className="form-label">Alloy</label>
                                    <input type="text" className="form-control form-control-sm" id="alloy" name="alloy" ref={alloy_ref} disabled={disable}/>
                                </div>

                                <div className="col-4 mb-2">
                                    <label htmlFor="size" className="form-label">Size</label>
                                    <input type="text" className="form-control form-control-sm" id="size" name="size" ref={size_ref} disabled={disable}/>
                                </div>

                                <div className="col-4 mb-2">
                                    <label htmlFor="weight" className="form-label">Weight</label>
                                    <input type="number" className="form-control form-control-sm" id="weight" name="weight" step="0.01" min="0.01" ref={weight_ref} disabled={disable}/>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12 product">
                            <div className="row">
                                <div className="col-4 mb-2">
                                    <label htmlFor="cut_weight" className="form-label">Cut Weight</label>
                                    <input type="number" className="form-control form-control-sm" id="cut_weight" name="cut_weight" step="0.01" min="0.01" ref={cut_weight_ref} disabled={disable}/>
                                </div>

                                <div className="col-4 mb-2">
                                    <label htmlFor="cut_length" className="form-label">Cut Length</label>
                                    <input type="number" className="form-control form-control-sm" id="cut_length" name="cut_length" step="0.01" min="0.01" ref={cut_length_ref} disabled={disable}/>
                                </div>

                                <div className="col-4 mb-2">
                                    <label htmlFor="cut_width" className="form-label">Cut Width</label>
                                    <input type="number" className="form-control form-control-sm" id="cut_width" name="cut_width" step="0.01" min="0.01" ref={cut_width_ref} disabled={disable}/>
                                </div>

                                <div className="col-6 mb-2">
                                    <label htmlFor="std_material_used" className="form-label">Std. Material Used</label>
                                    <input type="text" className="form-control form-control-sm" id="std_material_used" name="std_material_used" ref={std_material_used_ref} disabled={disable}/>
                                </div>

                                <div className="col-6 mb-2 crude">
                                    <label htmlFor="finished_code" className="form-label">Finished Code</label>
                                    <input type="text" className="form-control form-control-sm" id="finished_code" name="finished_code" ref={finished_code_ref} disabled={disable}/>
                                </div>

                                <div className="col-12 mb-2 crude">
                                    <label htmlFor="finished_desc" className="form-label">Finished Description</label>
                                    <input type="text" className="form-control form-control-sm" id="finished_desc" name="finished_desc" ref={finished_desc_ref} disabled={disable}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    

                    <div className="row">
                        <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-xs-12">
                            <button type="submit" className="btn btn-primary btn-sm w-100">Save</button>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-xs-12">
                            <button type="button" className="btn btn-secondary btn-sm w-100">Reset</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}