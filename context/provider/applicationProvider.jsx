import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ApplicationContext from '../applicationContext';

function ApplicationProvider({ children }) {
  const [filter, setFilter] = useState('0-500');

  const values = {
    filter,
    setFilter,
  };

  return (
    <ApplicationContext.Provider value={ values }>
      {children}
    </ApplicationContext.Provider>
  );
}

ApplicationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ApplicationProvider;
