import { React, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Messages(props) {
    const mySwal = withReactContent(Swal);

    switch (props.status) {
        case "success":
            mySwal.fire({
                icon: props.status,
                title: "Success",
                text: props.content,
            });
            break;
        case "warning":
            mySwal.fire({
                icon: props.status,
                title: "warning",
                text: props.content,
            });
            break;

        case "error":
            mySwal.fire({
                icon: props.status,
                title: "error",
                text: props.content,
            });
            break;
        default:
            return "";
            break;
    }
}
