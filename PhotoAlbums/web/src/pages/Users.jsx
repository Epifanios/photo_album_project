
import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../Api';
import SpinnerLoading from '../components/SpinnerLoading';
import UsersMap from '../components/maps/UsersMap';
import { FormattedMessage } from 'react-intl';

function Users() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await fetchUsers();
                setData(users);
                setLoading(false);
            } catch (error) {
                setError('Error fetching users');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <SpinnerLoading/>;
    }

    if (error) {
        return <div>{error}</div>;
    }


    return (
        <div className="container text-center">
            <div className="row mt-3 mb-5">
                <h1><FormattedMessage id="UsersTitle"/></h1>
            </div> 
            <UsersMap users={data}/>
        </div>
    );
}

export default Users;
