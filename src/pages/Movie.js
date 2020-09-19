import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';


function Movie(props){
    const { id } = useParams();
    console.log(props.location.state);
    return(
        <div>
            <h1>Movie Page</h1>
            <h1>{id}</h1>
        </div>
    )
}

export default Movie;