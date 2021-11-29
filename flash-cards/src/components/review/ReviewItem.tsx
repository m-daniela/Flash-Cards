import React, {useState} from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { deleteCard, updateCard } from '../../utils/server/serverCalls';
import { Card, SimpleCard } from '../../utils/types';
import Form from "react-bootstrap/Form";

import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { deleteCorrect, deleteIncorrect, updateCorrect, updateIncorrect } from '../../utils/store/redux';

interface Props {
    card: Card;
    isCorrect: boolean;
}

/**
 * Shows the information about the card and has the functions to update
 * and delete the selected card
 * @param {Card} card the card to operate on 
 */
const ReviewItem: React.FC<Props> = ({card, isCorrect}: Props) => {
    const lesson = useSelector((state: RootStateOrAny) => state.lesson);
    const category = useSelector((state: RootStateOrAny) => state.category);
    const [question, setQuestion] = useState(card.question);
    const [answer, setAnswer] = useState(card.answer);
    const [edit, toggleEdit] = useState(false);

    const dispatch = useDispatch();


    // send delete request to the server
    const deleteCardWrapper = () => {
        if (card._id){
            deleteCard(lesson, category, card._id)
                .then(result => {
                    if(result.modifiedCount !== 0){
                        if (isCorrect){
                            dispatch(deleteCorrect(card._id));
                        }
                        else{
                            dispatch(deleteIncorrect(card._id));
                        }
                    }
                });
        }
    };

    // check if the card information is valid and send an
    // update request to the server
    const updateCardWrapper = () => {
        if (question && answer) {
            const newCard: SimpleCard = {
                question,
                answer
            };
            toggleEdit(false);
            updateCard(lesson, category, card._id, newCard)
                .then(result => {
                    if(result.modifiedCount !== 0){
                        const finalCard: Card = {
                            _id: card._id,
                            ...newCard
                        };
                        if (isCorrect){
                            dispatch(updateCorrect(finalCard));
                        }
                        else{
                            dispatch(updateIncorrect(finalCard));
                        }
                    }
                });
        }
    };

    return (
        <div key={card._id} id={`${card._id}`} className="review-container row mx-auto justify-content-center my-3">
            {
                edit ? 
                    <>
                        <Form.Control as="textarea" className="tile col-12 col-md-5 order-2 order-md-1 mt-2 mx-md-2" onChange={(e) => setQuestion(e.target.value)} value={question} placeholder="Your entry..."/> 
                        <Form.Control as="textarea" className="tile col-12 col-md-5 order-3 order-md-2 mt-2 mx-md-2" onChange={(e) => setAnswer(e.target.value)} value={answer} placeholder="Your entry..."/> 
                        <div className="controls row col-12 col-md-1 order-1 order-md-3 justify-content-md-center">
                            <button name="finish" onClick={updateCardWrapper}><CheckRoundedIcon/></button>
                            <button name="close" onClick={() => toggleEdit(false)}><CloseRoundedIcon/></button>
                        </div>
                    </> 
                    :
                    <>
                        <div className="tile col-12 col-md-5 order-2 order-md-1 mt-2 mx-md-2 " >{card.question}</div>
                        <div className="tile col-12 col-md-5 order-3 order-md-2 mt-2 mx-md-2" >{card.answer}</div>
                        <div className="controls row col-12 col-md-1 order-1 order-md-3 justify-content-center">
                            <button name="edit" onClick={() => toggleEdit(true)}><EditRoundedIcon/></button>
                            <button name="delete" onClick={deleteCardWrapper}><DeleteRoundedIcon /></button>
                        </div>
                    </>
            }
            

        </div>
    );
};

export default ReviewItem;
