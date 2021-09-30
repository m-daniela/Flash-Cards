import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { addCorrect, addIncorrect, removeCard } from '../../utils/store/redux';
import Review from '../review/Review';
import AddCard from './AddCard';

/**
 * Card component
 * Display the current card (question)
 * Calls the AddCard and Review components on button click and removes 
 * the card from the "all" list and moves it to the correct/ incorrect
 * list, in the redux store
 * @TODO skip functionality
 * @TODO clean the lists when the category changes
 * @TODO better state management
 */
const Card: React.FC = () => {
    const cards = useSelector((state: RootStateOrAny) => state.cards.all);
    const dispatch = useDispatch();

    const [answer, setAsnwer] = useState("");

    const [add, setAdd] = useState(false); 
    const [review, setReview] = useState(false); 
    const [turned, setTurned] = useState(false); 

    const [currentCard, setCurrentCard] = useState({
        _id: "",
        question: "",
        answer: ""
    });

    const [display, setDisplay] = useState("");



    useEffect(() => {
        if (cards.length){
            setCurrentCard(cards[0]);
            setDisplay(cards[0].question);

        }
        else{
            setCurrentCard({
                _id: "",
                question: "No more cards",
                answer: "No more cards"
            });
        }
    }, [cards]);

    const checkAnswer = () => {
        setDisplay(currentCard.answer);
        setTurned(true);
    };

    const nextCard = () => {
        dispatch(removeCard(currentCard._id));
        if (answer.toLowerCase() === currentCard.answer.toLowerCase()){
            dispatch(addCorrect(currentCard));
        }
        else{
            dispatch(addIncorrect(currentCard));
        }
        setTurned(false);
        setDisplay(currentCard.question);

    };

    return (
        <>
            {add && <AddCard setAdd={setAdd}/>}
            {review && <Review setReview={setReview}/>}

            {(!add && !review) && 
                <div className="card">
                    <div className="tile">
                        {display}
                    </div>
                    <p id="state">incorrect</p>
                    <p className="card-info">
                        <textarea placeholder="Your answer..." onChange={(e) => setAsnwer(e.target.value)} value={answer} />
                        <div className="card-buttons">
                            <button name="skip">Skip</button>
                            {
                                !turned ? 
                                    <button name="submit" onClick={checkAnswer}>Submit</button>
                                    :
                                    <button name="submit" onClick={nextCard}>Next</button>
                            }
                        </div>
                    </p>
                    <div className="card-buttons additional">
                        <button name="review" onClick={() => setReview(true)}>Review</button>
                        <button name="add" onClick={() => setAdd(true)}>Add card</button>
                    </div>
                </div>

            }
        </>
        
    );
};

export default Card;
