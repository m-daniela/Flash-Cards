import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { addCorrect, addIncorrect, deleteCardReducer, skipCardReducer } from '../../utils/store/redux';
import Review from '../review/Review';
import AddCard from './AddCard';

/**
 * Display the current card (question first)
 * Switches to the AddCard and Review components on button click
 * When a card is answered, it is moved to the correct/ incorrect
 * list from the store
 * @TODO better state management
 */
const Card: React.FC = () => {
    const cards = useSelector((state: RootStateOrAny) => state.cards.all);
    const dispatch = useDispatch();

    const [answer, setAsnwer] = useState("");

    const [add, toggleAdd] = useState(false); 
    const [review, toggleReview] = useState(false); 
    const [turned, setTurned] = useState(false); 
    const [status, setStatus] = useState(-1);

    const [currentCard, setCurrentCard] = useState({
        _id: "",
        question: "",
        answer: ""
    });

    const [display, setDisplay] = useState("");

    useEffect(() => {
        if (cards.length !== 0){
            setCurrentCard(cards[0]);
            setDisplay(cards[0].question);
            setStatus(-1);
        }
        else{
            setDisplay("No cards");
            setCurrentCard({
                _id: "",
                question: "No cards",
                answer: "No cards"
            });
        }
    }, [cards]);

    // check if the answer is correct 
    const checkAnswer = () => {
        if (currentCard._id !== ""){
            setDisplay(currentCard.answer);
            setTurned(true);
            if (answer.toLowerCase() === currentCard.answer.toLowerCase()){
                setStatus(1);
            }
            else{
                setStatus(0);
            }
        }
        
    };

    // show the next card
    const nextCard = () => {
        if (currentCard._id !== ""){

            if (status === 1){
                dispatch(addCorrect(currentCard));
            }
            else{
                dispatch(addIncorrect(currentCard));
            }
        }
        dispatch(deleteCardReducer(currentCard._id));

        setTurned(false);
        setDisplay(currentCard.question);
        setAsnwer("");
    };

    const skipCard = () => {
        dispatch(skipCardReducer());
    };

    return (
        <>
            {add && <AddCard toggleAdd={toggleAdd}/>}
            {review && <Review toggleReview={toggleReview}/>}

            {(!add && !review) && 
                <div className="card">
                    <div className="tile">
                        {display}
                    </div>
                    <p id="state">
                        {status !== -1 ? 
                            <>
                                {
                                    status === 1 ? "Correct" : "Incorrect"
                                }
                            </> 
                            : 
                            <></>}
                    </p>
                    <div className="card-info">
                        <textarea placeholder="Your answer..." onChange={(e) => setAsnwer(e.target.value)} value={answer} />
                        <div className="card-buttons">
                            <button name="skip" disabled={turned} onClick={skipCard}>Skip</button>
                            {
                                !turned ? 
                                    <button name="submit" onClick={checkAnswer}>Submit</button>
                                    :
                                    <button name="submit" onClick={nextCard}>Next</button>
                            }
                        </div>
                    </div>
                    <div className="card-buttons additional">
                        <button name="review" onClick={() => toggleReview(true)}>Review</button>
                        <button name="add" onClick={() => toggleAdd(true)}>Add card</button>
                    </div>
                </div>

            }
        </>
        
    );
};

export default Card;
