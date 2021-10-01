import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Card } from '../../utils/types';
import ReviewItem from './ReviewItem';

interface Props{
    selectCorrect: boolean;
    selectIncorrect: boolean;
}

/**
 * Lists the cards that where answered, with the correct answer
 * @param {boolean} selectCorrect select the list of correct answers
 * @param {boolean} selectIncorrect select the list of incorrect answers
 */
const ListAnswers: React.FC<Props> = ({selectCorrect, selectIncorrect}: Props) => {
    const {correct, incorrect} = useSelector((state: RootStateOrAny) => state.cards);

    return (
        <div className="review">
            {selectCorrect && <>{correct.map((card: Card) => <ReviewItem key={card._id} isCorrect={selectCorrect} card={card}/>)}</> }
            {selectIncorrect && <>{incorrect.map((card: Card) => <ReviewItem key={card._id} isCorrect={selectCorrect} card={card}/>)}</> }
        </div>
    );
};

export default ListAnswers;
