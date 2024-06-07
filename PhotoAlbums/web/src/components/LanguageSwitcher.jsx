import React from 'react';

const LanguageSwitcher = ({onChange}) => {
    return (
        <nav class="navbar bg-body-tertiary">
            <div class="container-fluid">
                <div class="navbar-brand ps-5">Photo Albums</div>
                <div className="d-flex ms-auto">
                    <select className="pr-5 form-select" onChange={onChange}>
                        <option value="en">English</option>
                        <option value="gr">Greek</option>
                    </select>
                </div>
            </div>
        </nav>     
    );
};

export default LanguageSwitcher;
