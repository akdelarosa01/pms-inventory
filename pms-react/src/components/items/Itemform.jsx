import { useState } from "react";

export default function ItemForm() {
    const options = [
        { value: '', text: '--Choose an Item Category--', color: "color: #cfdce7"},
        { value: 'RAW MATERIAL', text: 'Raw Material', color: "color: #444444"},
        { value: 'FINISHED GOODS', text: 'Finished Goods', color: "color: #444444"},
        { value: 'CRUDE', text: 'Crude', color: "color: #444444"}
    ];

    const [selected, setSelected] = useState(options[0].value);

    const [disable, setDisabled] = useState(true);

    const handleChange = event => {
        const materials = document.querySelectorAll('.materials');
        const product = document.querySelector('.product');
        const crudes = document.querySelectorAll('.crude');
        const checker = ["CRUDE", "FINISHED GOODS"];

        setSelected(event.target.value);

        setDisabled(true);
        if (event.target.value != "") {
            setDisabled(false);
        }
        

        if (!checker.includes(event.target.value)) {
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

            if (event.target.value == "CRUDE") {
                crudes.forEach( (crude) => {crude.style.display = "block"})
            } else {
                crudes.forEach( (crude) => {crude.style.display = "none"})
            }
        }

    }

    return (
        <div className="card">
            <div className="card-header">
                <h4 className="card-title">Item Details </h4>
            </div>
            <div className="card-body">
                <form className="">

                    <div className="row mb-2">
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12 materials">
                            <div className="row">
                                <div className="col-md-4 mb-2">
                                    <label htmlFor="item_category" className="form-label">Item Category</label>
                                    <select className="form-control form-control-sm" id="item_category" value={selected} onChange={handleChange}>
                                        {
                                            options.map( option => (
                                                <option key={option.value} value={option.value}>{option.text}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <label htmlFor="item_type" className="form-label">Item Type</label>
                                    <input type="text" className="form-control form-control-sm" id="item_type" title="Material Type / Product Line" disabled={disable}/>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <label htmlFor="item_code" className="form-label">Item Code</label>
                                    <input type="text" className="form-control form-control-sm" id="item_code" disabled={disable}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <label htmlFor="item_desc" className="form-label">Description</label>
                                    <textarea id="item_desc" className="form-control form-control-sm" rows="5" style={{resize:"none"}} disabled={disable}></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12 materials">
                            <div className="row">
                                <div className="col-12 mb-2">
                                    <label htmlFor="item" className="form-label">Item</label>
                                    <input type="text" className="form-control form-control-sm" id="item" disabled={disable}/>
                                </div>

                                <div className="col-12 mb-2">
                                    <label htmlFor="schedule_class" className="form-label">Schedule / Class</label>
                                    <input type="text" className="form-control form-control-sm" id="schedule_class" disabled={disable}/>
                                </div>

                                <div className="col-4 mb-2">
                                    <label htmlFor="alloy" className="form-label">Alloy</label>
                                    <input type="text" className="form-control form-control-sm" id="alloy" disabled={disable}/>
                                </div>

                                <div className="col-4 mb-2">
                                    <label htmlFor="size" className="form-label">Size</label>
                                    <input type="text" className="form-control form-control-sm" id="size" disabled={disable}/>
                                </div>

                                <div className="col-4 mb-2">
                                    <label htmlFor="weight" className="form-label">Weight</label>
                                    <input type="number" className="form-control form-control-sm" id="weight" step="0.1" min="0.1" disabled={disable}/>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12 product">
                            <div className="row">
                                <div className="col-4 mb-2">
                                    <label htmlFor="cut_weight" className="form-label">Cut Weight</label>
                                    <input type="number" className="form-control form-control-sm" id="cut_weight" step="0.1" min="0.1" disabled={disable}/>
                                </div>

                                <div className="col-4 mb-2">
                                    <label htmlFor="cut_length" className="form-label">Cut Length</label>
                                    <input type="number" className="form-control form-control-sm" id="cut_length" step="0.1" min="0.1" disabled={disable}/>
                                </div>

                                <div className="col-4 mb-2">
                                    <label htmlFor="cut_width" className="form-label">Cut Width</label>
                                    <input type="number" className="form-control form-control-sm" id="cut_width" step="0.1" min="0.1" disabled={disable}/>
                                </div>

                                <div className="col-6 mb-2">
                                    <label htmlFor="std_material_used" className="form-label">Std. Material Used</label>
                                    <input type="text" className="form-control form-control-sm" id="std_material_used" disabled={disable}/>
                                </div>

                                <div className="col-6 mb-2 crude">
                                    <label htmlFor="finished_code" className="form-label">Finished Code</label>
                                    <input type="text" className="form-control form-control-sm" id="finished_code" disabled={disable}/>
                                </div>

                                <div className="col-12 mb-2 crude">
                                    <label htmlFor="finished_desc" className="form-label">Finished Description</label>
                                    <input type="text" className="form-control form-control-sm" id="finished_desc" disabled={disable}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    

                    <div className="row">
                        <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-xs-12">
                            <button type="submit" className="btn btn-primary btn-sm w-100">Save</button>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-xs-12">
                            <button type="reset" className="btn btn-secondary btn-sm w-100">Reset</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}