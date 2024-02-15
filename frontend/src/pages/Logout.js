import React from 'react'
import axios from '../api/axios'

const Logout = () => {
    const logout = async () => {
        await axios.post('/api/logout', {})
    }
}

export default Logout