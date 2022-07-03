import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ApplicationContext from '../applicationContext';

function ApplicationProvider({ children }) {
  const [byName, setByName] = useState('');
  const [filter, setFilter] = useState('0-500');
  const [wineById, setWineById] = useState({});
  const [winesG, setWinesG] = useState([]);
  const [counterCart, setCounterCart] = useState(0);

  const values = {
    filter,
    setFilter,
    wineById,
    setWineById,
    winesG,
    setWinesG,
    counterCart,
    setCounterCart,
    byName,
    setByName
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
