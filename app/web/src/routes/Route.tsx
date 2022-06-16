import {
    Route as ReactDOMRoute,
    RouteProps as ReactDOMRouteProps
} from 'react-router-dom';

// import { Routes } from 'react-router'

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
    isPrivate?: boolean;
    component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
    isPrivate = false,
    component: Component,
    ...rest
}) => {
    const { user } = useAuth();

    return (
        <ReactDOMRoute
            {...rest}
            element={<Component />}
        />
    );
};

export default Route;
