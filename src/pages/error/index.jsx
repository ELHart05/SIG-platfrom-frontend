import { Link } from "react-router-dom";

export default function Error() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">404 Page</h1>
            <p className="text-lg text-gray-600 mb-6">Oups! Quelque chose s'est mal passé.</p>
            <Link
                to='/'
                className="w-full p-2 max-w-[200px] font-bold text-white bg-blue-500 flex items-center justify-center rounded transition-all hover:bg-white border border-transparent hover:text-blue-500 hover:border-black"
            >
                Retour à l'accueil
            </Link>
        </div>
    );
}
