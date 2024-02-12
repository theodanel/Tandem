import React from 'react'
import Header from './Header'
import Footer from './Footer'


// Ce composant représente le squelette de notre application
const Layout = ({ children }) => {
    return (
        <div className="App">
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default Layout