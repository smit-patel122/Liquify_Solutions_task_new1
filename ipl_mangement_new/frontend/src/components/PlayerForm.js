import React, { useState, useEffect } from 'react';

const PlayerForm = ({ player, onSave, teams, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        role: 'Batsman',
        isCaptain: false,
        isViceCaptain: false,
        team: 'Team A'
    });

    useEffect(() => {
        if (player) {
            setFormData({
                name: player.name,
                role: player.role,
                isCaptain: player.isCaptain,
                isViceCaptain: player.isViceCaptain,
                team: player.team
            });
        }
    }, [player]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/players${player ? `/${player._id}` : ''}`, {
                method: player ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            if (response.ok) {
                alert('Player data sent to backend successfully!');
                onSave(result);
            } else {
                alert(`Failed to send player data: ${result.message}`);
            }
        } catch (error) {
            alert('Error sending player data.');
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
            />
            <select
                name="role"
                value={formData.role}
                onChange={handleChange}
            >
                <option value="Batsman">Batsman</option>
                <option value="Bowler">Bowler</option>
                <option value="All Rounder">All Rounder</option>
                <option value="WK">WK</option>
            </select>
            <label>
                <input
                    type="checkbox"
                    name="isCaptain"
                    checked={formData.isCaptain}
                    onChange={handleChange}
                />
                Captain
            </label>
            <label>
                <input
                    type="checkbox"
                    name="isViceCaptain"
                    checked={formData.isViceCaptain}
                    onChange={handleChange}
                />
                Vice-Captain
            </label>
            <select
                name="team"
                value={formData.team}
                onChange={handleChange}
            >
                {teams.map(team => (
                    <option key={team} value={team}>{team}</option>
                ))}
            </select>
            <button type="submit">Save Player</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default PlayerForm;
