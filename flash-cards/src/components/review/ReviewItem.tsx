import React, {useState} from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { deleteCard, updateCard } from '../../utils/server/serverCalls';
import { Card, SimpleCard } from '../../utils/types';

import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

interface Props {
    card: Card;
}

/**
 * Shows the information about the card and has the functions to update
 * and delete the selected card
 * @param {Card} card the card to operate on 
 */
const ReviewItem: React.FC<Props> = ({card}) => {
    const lesson = useSelector((state: RootStateOrAny) => state.lesson);
    const category = useSelector((state: RootStateOrAny) => state.category);
    const [question, setQuestion] = useState(card.question);
    const [answer, setAnswer] = useState(card.answer);
    const [edit, toggleEdit] = useState(false);


    // send delete request to the server
    const deleteSelectedCard = () => {
        if (card._id){
            deleteCard(lesson, category, card._id);
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
            updateCard(lesson, category, card._id, newCard);
            toggleEdit(false);
        }
        
    };

    return (
        <div key={card._id} id={`${card._id}`} className="review-container">
            {
                edit ? 
                    <>
                        <button name="finish" onClick={updateCardWrapper}><CheckRoundedIcon/></button>
                        <textarea className="tile" onChange={(e) => setQuestion(e.target.value)} value={question} placeholder="Your entry..."/> 
                        <textarea className="tile" onChange={(e) => setAnswer(e.target.value)} value={answer} placeholder="Your entry..."/> 
                        <button name="close" onClick={() => toggleEdit(false)}><CloseRoundedIcon/></button>
                    </> 
                    :
                    <>
                        <button name="edit" onClick={() => toggleEdit(true)}><EditRoundedIcon/></button>
                        <div className="tile" >{card.question}</div>
                        <div className="tile" >{card.answer}</div>
                        <button name="delete" onClick={deleteSelectedCard}><DeleteRoundedIcon /></button>

                    </>
            }
            

        </div>
    );
};

export default ReviewItem;
