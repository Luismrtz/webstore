import React from 'react';
import './Button.scss';
import { Link } from 'react-router-dom';

export function Button() {
  return (
    <Link to='sign-up'>
      <button className='btn'>Sign Up</button>
    </Link>
  );
}