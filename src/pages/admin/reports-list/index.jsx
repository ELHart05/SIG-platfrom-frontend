import { useState, useEffect } from "react";
import API from "../../../utils/api-client";
import errorManager from "../../../utils/errorManager";
import FullScreenDialog from '../../../components/FullScreenDialog'
import LoadingWrapper from "../../../components/LoadingWrapper";
import AdminReportListContent from "../../../components/AdminReportListContent";

export default function AdminReportList() {

    const [reports, setReports] = useState([]);
    const [filteredReports, setFilteredReports] = useState([]);
    const [activeReport, setActiveReport] = useState(null);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [current_page, setCurrentPage] = useState(1);
    const [pageProps, setPageProps] = useState({
        total: 0,
        pagePointers: {
            next_page_url: null,
            prev_page_url: null
        }
    });

    useEffect(() => {
        const getReportList = async () => {
            try {
                setIsLoading(true);
                const response = await API.get('admin/reports?page='+current_page);
                const data = response.data.data.map((e) => ({
                    ...e,
                    photos: JSON.parse(e.photos)
                }));

                const pageProps = {
                    total: Math.ceil(response?.data?.total / response?.data?.per_page),
                    pagePointers: {
                        next_page_url: response?.data?.next_page_url,
                        prev_page_url: response?.data?.prev_page_url
                    }
                }
                setPageProps(pageProps);
                setReports(data);
                setFilteredReports(data);
                setActiveReport(data[0]);
            } catch (error) {
                errorManager(error);
            } finally {
                setIsLoading(false);
            }
        }
        getReportList();
    }, [current_page]);

    return (
        <LoadingWrapper isLoading={isLoading}>
            {
                <FullScreenDialog
                    open={open}
                    setOpen={setOpen}
                    activeReport={activeReport}
                />
            }
            <AdminReportListContent
                reports={reports}
                setReports={setReports}
                filteredReports={filteredReports}
                setFilteredReports={setFilteredReports}
                setActiveReport={setActiveReport}
                activeReport={activeReport}
                setOpen={setOpen}
                pageProps={pageProps}
                isLoading={isLoading}
                current_page={current_page}
                setCurrentPage={setCurrentPage}
            />
        </LoadingWrapper>
    )
}
