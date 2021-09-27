import React, { useState } from 'react';
import ListAnswers from './ListAnswers';

const Review: React.FC = () => {
    const [selectCorrect, setSelectCorrect] = useState(true);
    const [selectIncorrect, setSelectIncorrect] = useState(false);

    const selectionButton = (): void => {
        setSelectCorrect(!selectCorrect);
        setSelectIncorrect(!selectIncorrect);
    };

    return (
        <div className="review">
            <div className="review-buttons">
                <button name="correct" onClick={selectionButton}>Correct</button>
                <button name="incorrect" onClick={selectionButton}>Incorrect</button>
            </div>
            <ListAnswers selectCorrect={selectCorrect} selectIncorrect={selectIncorrect} />
        </div>
    );
};

export default Review;
