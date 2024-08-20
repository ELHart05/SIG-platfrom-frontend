import Spinner from "react-spinner-material";

export default function LoadingWrapper({
    children,
    isLoading = false
}) {
    return (
        <div>
            {isLoading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <Spinner radius={120} color={"#333"} stroke={2} height={"36px"} width={"36px"} visible={true} />
                </div>
            ) : (
                children
            )}
        </div>
    )
}
