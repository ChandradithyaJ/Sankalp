/*** API call for local testing ***/

import axios from 'axios'

export default axios.create({
    baseURL: 'http://localhost:3500/'
})
