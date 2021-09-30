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

const ReviewItem: React.FC<Props> = ({card}) => {
    const lesson = useSelector((state: RootStateOrAny) => state.lesson);
    const category = useSelector((state: RootStateOrAny) => state.category);
    const [question, setQuestion] = useState(card.question);
    const [answer, setAnswer] = useState(card.answer);
    const [edit, setEdit] = useState(false);


    const deleteSelectedCard = () => {
        deleteCard(lesson, category, card._id);
    };

    const updateCardWrapper = () => {
        const newCard: SimpleCard = {
            question,
            answer
        };
        updateCard(lesson, category, card._id, newCard);
        setEdit(false);
    };

    return (
        <div key={card._id} id={`${card._id}`} className="review-container">
            {
                edit ? 
                    <>
                        <button name="finish" onClick={updateCardWrapper}><CheckRoundedIcon/></button>
                        <textarea className="tile" onChange={(e) => setQuestion(e.target.value)} value={question} placeholder="Your entry..."/> 
                        <textarea className="tile" onChange={(e) => setAnswer(e.target.value)} value={answer} placeholder="Your entry..."/> 
                        <button name="close" onClick={() => setEdit(false)}><CloseRoundedIcon/></button>

                    </> 
                    :
                    <>
                        <button name="edit" onClick={() => setEdit(true)}><EditRoundedIcon/></button>
                        <div className="tile" >{card.question}</div>
                        <div className="tile" >{card.answer}</div>
                        <button name="delete" onClick={deleteSelectedCard}><DeleteRoundedIcon /></button>

                    </>
            }
            

        </div>
    );
};

export default ReviewItem;
