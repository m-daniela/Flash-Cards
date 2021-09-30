import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Card } from '../../utils/types';
import ReviewItem from './ReviewItem';

interface Props{
    selectCorrect: boolean;
    selectIncorrect: boolean;
}

const ListAnswers: React.FC<Props> = ({selectCorrect, selectIncorrect}: Props) => {
    const {correct, incorrect} = useSelector((state: RootStateOrAny) => state.cards);


    return (
        <div className="review">
            {selectCorrect && <>{correct.map((card: Card) => <ReviewItem key={card._id} card={card}/>)}</> }
            {selectIncorrect && <>{incorrect.map((card: Card) => <ReviewItem key={card._id} card={card}/>)}</> }
        </div>
    );
};

export default ListAnswers;
