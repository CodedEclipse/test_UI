import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Toast = (type, msg) => {
    switch (type) {
        case 1:
            toast.success(<div dangerouslySetInnerHTML={{ __html: msg }}></div>, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            break;
        case 2:
            toast.error(<div dangerouslySetInnerHTML={{ __html: msg }}></div>, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            break;
        case 3:
            toast.info(<div dangerouslySetInnerHTML={{ __html: msg }}></div>, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            break;
        case 4:
            toast.warn(<div dangerouslySetInnerHTML={{ __html: msg }}></div>, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            break;
        default:
            toast(<div dangerouslySetInnerHTML={{ __html: msg }}></div>, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            break;
    }
};