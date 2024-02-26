import React, { useEffect } from 'react'

const NotFound = () => {
  useEffect(()=> {
    document.title = `Page introuvable`;
  }, []);
  return (
    
    <div className='notFound'>
        <h1 className="title">Page non trouvée</h1>
    </div>
  )
}

export default NotFound