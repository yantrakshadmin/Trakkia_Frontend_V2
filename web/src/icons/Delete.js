import React from 'react';
import {yantraColors} from '../helpers/yantraColors';

const Delete = () => {
  return <i className="fas fa-trash-alt" style={{color: yantraColors['danger'], fontSize: 15, margin:'auto 5px'}} />;
};

export default Delete;
