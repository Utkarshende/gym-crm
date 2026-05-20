import Swal from "sweetalert2";
export const successAlert = (title, text="")=>{
    Swal.fire({
        icon: 'success',
        title,
        text,
        confirmButtonColor:"#2563eb"
    });
};

export const errorAlert = (title, text="")=>{
    Swal.fire({
        icon: 'error',
        title,
        text,
        confirmButtonColor:"#dc2626"
    });
}

export const warningAlert = (title, text="")=>{
    Swal.fire({
        icon: 'warning',        
        title,
        text,
        confirmButtonColor:"#f59e0b"
    });
}

export const confirmAlert = async(title, text="")=>{
    return Swal.fire({
        title
        ,text
        ,icon: 'warning'
        ,showCancelButton: true,
        confirmButtonColor: '#dc2626',
        cancelButtonColor: '#2563eb',
        confirmButtonText: 'Yes, delete it!'
    });
};