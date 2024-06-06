import React from 'react';

const Pagination = ({ currentPage, pageSize, totalItems, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / pageSize);

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <nav>
            <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={handlePrevious}>Previous</button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => onPageChange(index + 1)}>
                            {index + 1}
                        </button>
                    </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={handleNext}>Next</button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
