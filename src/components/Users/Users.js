import React from 'react';
import Useritems from './Useritems';
import Spinner from '../Layout/Spinner.js'
import PropTypes from 'prop-types';


 const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
  }

const Users = (props) => {
    if (props.loading) {
      return <Spinner/>
    }
      else {
        return (
          <div style={userStyle}>
            {props.users.map(user => (
             <Useritems key={user.id} user= {user}/> 
            ))}
          </div>
        );
    }
  }

Users.propTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}


 

export default Users;






