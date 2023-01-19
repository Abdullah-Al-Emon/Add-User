import React from 'react';

const Option = ({common}) => {
    return (
        <option  value={common.name}>{common.name}</option>
    );
};

export default Option;