import axios from 'axios';

// const baseDonmain  = 'http://127.0.0.1:8000/api';
// const backendDomain  = 'http://127.0.0.1:8000/data/';
const backendDomain  = 'https://shubham.tngwebsolutions.ca/backend/public/data/';
const baseDonmain  = 'https://shubham.tngwebsolutions.ca/backend/api';
export const customHeader = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
};

export const baseUrl = `${ baseDonmain }`;

export const backendUrl = `${ backendDomain }`;

export const loginUser = (localStorage.getItem('userData') != null) ? JSON.parse(localStorage.getItem('userData')) : ''; 

export const currentDemo = 35;

export default axios.create( {
    baseUrl,
    headers: customHeader,
    
} )

