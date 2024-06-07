import React, {useState} from 'react';
import Pagination from '../Pagination';

const UsersMap = ({users}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items per page

    // Calculate the data to display based on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = users.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="row row-cols-md-2 row-cols-lg-5 g-2 g-lg-3 users_row">
            {currentData.map(user => (
                <a key={user.id} href={`user/${user.id}/albums`}>
                    <div className="col bg-light">
                        <div>
                            <i className="bi bi-person-circle"></i>
                        </div>
                        <div className="p-3 person_col">
                            <p className="username mb-0">{user.name}</p>
                            <p className="email">{user.email}</p>
                        </div>
                    </div>
                </a>
            ))}
            <div className="d-flex justify-content-center w-100 mt-5">
                <Pagination
                    currentPage={currentPage}
                    pageSize={itemsPerPage}
                    totalItems={users.length}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>   
    );
};

export default UsersMap;
