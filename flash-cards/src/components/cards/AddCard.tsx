import React, { useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { addCard } from '../../utils/server/serverCalls';
import { SimpleCard } from '../../utils/types';

interface Props {
    setAdd: (a: boolean) => void;
}

const AddCard: React.FC<Props> = ({setAdd}: Props) => {
    const lesson = useSelector((state: RootStateOrAny) => state.lesson);
    const category = useSelector((state: RootStateOrAny) => state.category);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const addNewCard = () =>{
        if (question && answer){
            const card: SimpleCard = {
                question,
                answer
            };
            addCard(lesson, category, card);
            setAdd(false);
        }
        
    };


    return (
        <div className="add-card">
            <textarea onChange={(e) => setQuestion(e.target.value)} value={question}/>
            <textarea onChange={(e) => setAnswer(e.target.value)} value={answer}/>
            <button onClick={() => setAdd(false)}>Close</button>
            <button onClick={addNewCard}>Add card</button>
        </div>
    );
};

export default AddCard;
