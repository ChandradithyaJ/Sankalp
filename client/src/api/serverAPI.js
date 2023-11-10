/*** API call from React to Node, hosted on render ***/

import axios from 'axios'

export default axios.create({
    baseURL: 'https://sankalp-api.onrender.com/'
})