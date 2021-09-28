import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Card } from '../../utils/types';

interface Props{
    selectCorrect: boolean;
    selectIncorrect: boolean;
}

const ListAnswers: React.FC<Props> = ({selectCorrect, selectIncorrect}: Props) => {
    const {correct, incorrect} = useSelector((state: RootStateOrAny) => state.cards);

    const reviewItem: any = (card: Card) => {
        return(<div key={card._id} className="review-container">
            <div className="tile" >{card.question}</div>
            <div className="tile" >{card.answer}</div>
        </div>);
    };

    return (
        <div className="review">
            {selectCorrect && <>{correct.map((card: Card) => reviewItem(card))}</> }
            {selectIncorrect && <>{incorrect.map((card: Card) => reviewItem(card))}</> }
        </div>
    );
};

export default ListAnswers;
