import React from 'react';

const PlayerList = ({ players, onEdit, onDelete }) => {
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/players/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                onDelete(id);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <ul>
            {players.map(player => (
                <li key={player._id}>
                    <span>{player.name} - {player.role} - {player.team}</span>
                    <button onClick={() => onEdit(player)}>Edit</button>
                    <button onClick={() => handleDelete(player._id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default PlayerList;
