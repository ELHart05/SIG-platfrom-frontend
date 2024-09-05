import { Link } from "react-router-dom";
import useLayouter from "../utils/useLayouter";

function LayoutHeader() {
    
    const {
        title,
        links
    } = useLayouter();
    
    return (
        <div className="flex my-10 items-center gap-3 flex-col xl:flex-row justify-center xl:justify-between flex-wrap w-full">
            <h1 className="text-3xl font-bold text-center">{title}</h1>
            {
                links.map(({to, text}) => (
                    <Link key={to} className="p-2 font-bold text-white bg-greener rounded transition-all hover:bg-white border border-transparent hover:text-greener hover:border-black" to={to}>
                        {text}
                    </Link>
                ))
            }
        </div>
    );
}

export default LayoutHeader;