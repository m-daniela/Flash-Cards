import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';

interface Props{
    selectCorrect: boolean;
    selectIncorrect: boolean;
}

const ListAnswers: React.FC<Props> = ({selectCorrect, selectIncorrect}: Props) => {
    const {correct, incorrect} = useSelector((state: RootStateOrAny) => state.cards);
    return (
        <div>
            {selectCorrect && <>{correct.map((elem: any) => <div key={elem._id}>{elem.question} {elem.asnwer}</div>)}</> }
            {selectIncorrect && <>{incorrect.map((elem: any) => <div key={elem._id}>{elem.question} {elem.asnwer}</div>)}</> }
        </div>
    );
};

export default ListAnswers;
