import React, {useRef, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Toast = ({ message, type, show, onClose}) => {
    const toastRef = useRef(null);

    useEffect(() => {
        if (show && toastRef.current) {
            const toastElement = new window.bootstrap.Toast(toastRef.current);
            toastElement.show();
        }
    }, [show]);

    return (
        <div className={`toast align-items-center mt-3 text-bg-${type} ${show ? 'show' : 'hide'}`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex">
                <div className="toast-body">
                    {message}
                </div>
                <button type="button" className="btn-close btn-close-white me-2 m-auto" aria-label="Close" onClick={onClose}></button>
            </div>
        </div>
    );
};

export default Toast;
