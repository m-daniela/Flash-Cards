import React, { useState } from 'react';
import ListAnswers from './ListAnswers';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';

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
        <div className="review row flex-column align-items-center mx-auto my-2">
            <ButtonGroup as={Row} mb={5} className="review-buttons">
                <Button className="btn-custom" onClick={()=>toggleReview(false)}>Close</Button>
                <Button className={`btn-custom ${selectCorrect ? "selected" : ""}`} name="correct" onClick={selectionButton}>Correct</Button>
                <Button className={`btn-custom ${selectIncorrect ? "selected" : ""}`} name="incorrect" onClick={selectionButton}>Incorrect</Button>
            </ButtonGroup>
            <ListAnswers selectCorrect={selectCorrect} selectIncorrect={selectIncorrect} />
        </div>
    );
};

export default Review;
