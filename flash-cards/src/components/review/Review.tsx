import React, { useState } from 'react';
import ListAnswers from './ListAnswers';

interface Props {
    setReview: (a: boolean) => void;
}

const Review: React.FC<Props> = ({setReview}: Props) => {
    const [selectCorrect, setSelectCorrect] = useState(true);
    const [selectIncorrect, setSelectIncorrect] = useState(false);

    const selectionButton = (): void => {
        setSelectCorrect(!selectCorrect);
        setSelectIncorrect(!selectIncorrect);
    };

    return (
        <div className="review">
            <div className="review-buttons">
                <button onClick={()=>setReview(false)}>Back</button>

                <button className={selectCorrect ? "selected" : ""} name="correct" onClick={selectionButton}>Correct</button>
                <button className={selectIncorrect ? "selected" : ""} name="incorrect" onClick={selectionButton}>Incorrect</button>
            </div>
            <ListAnswers selectCorrect={selectCorrect} selectIncorrect={selectIncorrect} />
        </div>
    );
};

export default Review;
