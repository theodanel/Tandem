import React from 'react';

const Results = (props) => {
  const query = new URLSearchParams(props.location.search).get('query');

  return (
    <div>
      <h2>Résultats de la recherche pour "{query}"</h2>
      {/* Mettez en œuvre le rendu des résultats ici */}
        
    </div>
  );
};

export default Results;
