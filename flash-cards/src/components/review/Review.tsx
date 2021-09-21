import React from 'react';

const Review: React.FC = () => {
    return (
        <div className="review">
            <div className="review-buttons">
                <button name="correct">Correct</button>
                <button name="incorrect">Incorrect</button>
            </div>
        </div>
    );
};

export default Review;
