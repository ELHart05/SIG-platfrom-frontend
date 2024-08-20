import { useLocation } from "react-router-dom";
import routes from "../../routes";

const useLayouter = () => {
    const { pathname } = useLocation();
    const route = routes[pathname];
    
    return route ?? {
        title: 'Not Found!',
        links: []
    };
}

export default useLayouter;
