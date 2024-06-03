import React from 'react';
import Ingredients from './Ingredientes'; // Assuming this is the name of your table component

const TripleIngredientTable = () => {
    return (
        <div>
            <h2>First Table</h2>
            <Ingredients /> {/* Render the table component once */}

            <h2>Second Table</h2>
            <Ingredients /> {/* Render the table component a second time */}

            <h2>Third Table</h2>
            <Ingredients /> {/* Render the table component a third time */}
        </div>
    );
};

export default TripleIngredientTable;
