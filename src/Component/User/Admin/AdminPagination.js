import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import Admin from "./Admin"
import './Admin.css'


const AdminPagination = () =>
{
    const [page, setPage] = useState(1)

    const getPostsPage = async (pageParam = 1) =>
    {
        const response = await axios?.get(`https://63b5737158084a7af394adfc.mockapi.io/users?user_type=admin&page=${pageParam}&limit=5`)
        return response.data
    }

    const { data: users, isLoading, error, refetch } = useQuery([page], () => getPostsPage(page), {
        keepPreviousData: true
    })
    refetch()


    // console.log(users)

    const content = <Admin users={users} isLoading={isLoading} error={error} />

    const nextPage = () => setPage(prev => prev + 1)

    const prevPage = () => setPage(prev => prev - 1)

    return (
        <>
            {content}
            <div className="pagination-div">
                <button className="btn-pagination" onClick={prevPage} disabled={page === 1}>Prev Page</button>
                <button className="btn-pagination" onClick={nextPage} disabled={!users?.length}>Next Page</button>
            </div>
        </>
    )
}
export default AdminPagination;