import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';

const SpinnerLoading = ({loading}) => {
    return (
        <div className="text-center" style={{ padding: '50px' }}>
            <FadeLoader className="spinner" color="#123abc" loading={loading} size={150} />
        </div>
    );
};

export default SpinnerLoading;
