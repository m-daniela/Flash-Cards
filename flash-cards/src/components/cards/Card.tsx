import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/button';
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
                <div className="row flex-column align-items-center mx-auto my-2">
                    <span className="col-12 col-md-6 py-1 text-center">Answer the questions</span>

                    <div className="tile col-12 col-md-6 my-3 py-1">
                        {display}
                    </div>
                    <p id="state" className="col-12 col-md-6 text-center my-3">
                        {status !== -1 && <>{status === 1 ? "Correct" : "Incorrect"}</>}
                    </p>
                    <textarea placeholder="Your answer..." className="col-12 col-md-6 py-1" onChange={(e) => setAsnwer(e.target.value)} value={answer} />

                    <div className="row row-cols-2 mt-3 col-12 col-md-6 justify-content-between p-0">
                        <Button name="skip" className="btn-custom col-4" disabled={turned} onClick={skipCard}>Skip</Button>
                        {
                            !turned ? 
                                <Button name="submit" className="btn-custom col-4" onClick={checkAnswer}>Submit</Button>
                                :
                                <Button name="submit" className="btn-custom col-4" onClick={nextCard}>Next</Button>
                        }
                        <div className="col-12"></div>
                        <Button name="review" className="btn-custom col-4" onClick={() => toggleReview(true)}>Review</Button>
                        <Button name="add" className="btn-custom col-4" onClick={() => toggleAdd(true)}>Add</Button>
                    </div>
                </div>
            }
        </>
    );
};

export default Card;
