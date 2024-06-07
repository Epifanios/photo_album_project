
import React from 'react';
import { FormattedMessage } from 'react-intl';

function PageNotFound() {
  return (
    <div className="container text-center">
      <div className="row">
          <h1><FormattedMessage id="PageNotFound"/></h1>         
      </div>      
    </div>
  );
}

export default PageNotFound;
