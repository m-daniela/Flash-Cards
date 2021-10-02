import React, { useState } from 'react';
import ListAnswers from './ListAnswers';

interface Props {
    toggleReview: (a: boolean) => void;
}

/**
 * Wrapper for the list of correct and incorrect answers
 * @param {function} toggleReview toggle the review component 
 */
const Review: React.FC<Props> = ({toggleReview}: Props) => {
    const [selectCorrect, setSelectCorrect] = useState(true);
    const [selectIncorrect, setSelectIncorrect] = useState(false);

    const selectionButton = (): void => {
        setSelectCorrect(!selectCorrect);
        setSelectIncorrect(!selectIncorrect);
    };

    return (
        <div className="review">
            <div className="review-buttons">
                <button onClick={()=>toggleReview(false)}>Close</button>

                <button className={selectCorrect ? "selected" : ""} name="correct" onClick={selectionButton}>Correct</button>
                <button className={selectIncorrect ? "selected" : ""} name="incorrect" onClick={selectionButton}>Incorrect</button>
            </div>
            <ListAnswers selectCorrect={selectCorrect} selectIncorrect={selectIncorrect} />
        </div>
    );
};

export default Review;
