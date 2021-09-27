import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { routes } from '../../utils/constants';

/**
 * Card component
 * @returns 
 */
const Card: React.FC = () => {
    const path: string = routes.reviewUrl(useLocation()?.pathname);
    const cards = useSelector((state: RootStateOrAny) => state.cards.all);

    const [currentCard, setCurrentCard] = useState(cards[0]);
    const [display, setDisplay] = useState(currentCard.question); 
    const [position, setPosition] = useState(0); 

    console.log(cards);

    useEffect(() => {
        if (cards.length !== 0){
            setCurrentCard(cards[0]);
        }
    }, cards);

    const onSubmitAnswer = (e: any) => {
        e.preventDefault();
        setDisplay(currentCard.answer);
    };

    return (
        <div className="card">
            <div className="tile">
                {display}
            </div>
            <p id="state">incorrect</p>
            <form onSubmit={(e) => onSubmitAnswer(e)}>
                <textarea placeholder="Your answer..."></textarea>
                <div className="card-buttons">
                    <button name="skip">Skip</button>
                    <button name="submit">Submit</button>
                </div>
            </form>
            <div className="card-buttons additional">
                <button name="review"><Link to={path}>Review</Link></button>
                <button name="add">Add card</button>
            </div>
        </div>
    );
};

export default Card;
