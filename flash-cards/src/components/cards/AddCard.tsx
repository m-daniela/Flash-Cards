import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
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
        <div className="add-card row flex-column align-items-center mx-auto my-2">
            <span className="col-12 col-md-6 py-1 text-center">Add a new card</span>
            <Form.Control as="textarea" placeholder="Enter question..." className="col-12 col-md-6 py-1 my-3" onChange={(e) => setQuestion(e.target.value)} value={question}/>
            <Form.Control as="textarea" placeholder="Enter answer..." className="col-12 col-md-6 py-1 my-3" onChange={(e) => setAnswer(e.target.value)} value={answer}/>

            <div className="row col-12 col-md-6 justify-content-between py-1 px-0">
                <button name="close" className="col-4" onClick={() => toggleAdd(false)}>Close</button>
                <button name="add-card" className="col-4" onClick={addNewCard}>Finish</button>
            </div>
            
        </div>
    );
};

export default AddCard;
