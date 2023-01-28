import { useRef, useState } from "react";

const [msg,setMsg] = useState(null);
const [errors,setErrors] = useState(null);

export function message(data) {
    switch (data.status) {
        case 'success':
            setMsg(<div className="alert alert-success mt-3 alert-dismissible fade show" role="alert">
                        {data.message}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>)
            break; 
        case 'warning':
            setMsg(<div className="alert alert-warning mt-3 alert-dismissible fade show" role="alert">
                        {data.message}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>)
            break;
    
        default:
            setMsg(<div className="alert alert-danger mt-3 alert-dismissible fade show" role="alert">
                        {data.message}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>)
            break;
    }

    return msg;
}

export function error() {
    
}