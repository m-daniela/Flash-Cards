import React, { useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { addCard } from '../../utils/server/serverCalls';
import { addCardReducer } from '../../utils/store/redux';
import { SimpleCard } from '../../utils/types';

interface Props {
    toggleAdd: (a: boolean) => void;
}


/**
 * Send a request to the server to add the input card
 * if it is valid 
 * @param {function} toggleAdd hide the AddCard component
 */
const AddCard: React.FC<Props> = ({toggleAdd}: Props) => {
    const lesson = useSelector((state: RootStateOrAny) => state.lesson);
    const category = useSelector((state: RootStateOrAny) => state.category);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const dispatch = useDispatch();

    // validate card
    const addNewCard = () =>{
        if (question && answer){
            const card: SimpleCard = {
                question,
                answer
            };
            addCard(lesson, category, card)
                .then(result => {
                    if (result) {
                        dispatch(addCardReducer(result));
                    }
                })
                .catch(console.log);
            toggleAdd(false);
        }
    };


    return (
        <div className="add-card">
            <textarea onChange={(e) => setQuestion(e.target.value)} value={question}/>
            <textarea onChange={(e) => setAnswer(e.target.value)} value={answer}/>
            <button onClick={() => toggleAdd(false)}>Close</button>
            <button onClick={addNewCard}>Add card</button>
        </div>
    );
};

export default AddCard;
