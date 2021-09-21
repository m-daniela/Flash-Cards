import React from 'react';

const Card: React.FC = () => {
    return (
        <div className="card">
            <div className="tile"></div>
            <p id="state">incorrect</p>
            <form>
                <textarea placeholder="Your answer..."></textarea>
                <div className="card-buttons">
                    <button name="skip">Skip</button>
                    <button name="submit">Submit</button>
                    <button name="review">Review</button>
                    <button name="add">Add card</button>
                </div>
            </form>
        </div>
    );
};

export default Card;
