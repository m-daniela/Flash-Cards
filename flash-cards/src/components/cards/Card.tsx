import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { routes } from '../../utils/constants';

/**
 * Card component
 * @returns 
 */
const Card: React.FC = () => {
    const path: string = routes.reviewUrl(useLocation()?.pathname);
    return (
        <div className="card">
            <div className="tile"></div>
            <p id="state">incorrect</p>
            <form onSubmit={(e) => e.preventDefault()}>
                <textarea placeholder="Your answer..."></textarea>
                <div className="card-buttons">
                    <button name="skip">Skip</button>
                    <button name="submit">Submit</button>
                </div>
            </form>
            <div className="card-buttons additional">
                <button name="review"><Link to={path}>Review</Link></button>
                <button name="add">Add card</button>
            </div>
        </div>
    );
};

export default Card;
