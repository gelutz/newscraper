import React from 'react';

import { ToastMessage } from '../../hooks/toast';

interface ToastContainerProps {
    messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
    messages.forEach((element) => {
        console.log(element);
    });
    return <></>;
};
export default ToastContainer;
