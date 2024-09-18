import React, { useState, useEffect } from 'react';
import PlayerForm from './components/PlayerForm';
import PlayerList from './components/PlayerList';
import FilterOptions from './components/FilterOptions';
import './App.css'; // Import the CSS file

const initialTeams = ['Team A', 'Team B', 'Team C','Team D','Team F',]; // Initial set of teams

const App = () => {
    const [players, setPlayers] = useState([]);
    const [editingPlayer, setEditingPlayer] = useState(null);
    const [filters, setFilters] = useState({});
    const [teams, setTeams] = useState(initialTeams);
    const [newTeam, setNewTeam] = useState('');

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/players');
                const data = await response.json();
                setPlayers(data);
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };

        fetchPlayers();
    }, []);

    const addOrUpdatePlayer = (player) => {
        setPlayers(prev => {
            if (editingPlayer) {
                return prev.map(p => p._id ===  player._id ?   player : p);
            } else {
                return [...prev,  player];
            }
        });
        setEditingPlayer(null);
    };

    const handleEdit = (player) => {
        setEditingPlayer(player);
    };

    const handleDelete = (id) => {
        setPlayers(prev => prev.filter(player => player._id !== id));
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleAddTeam = () => {
        if (newTeam && !teams.includes(newTeam)) {
            setTeams(prevTeams => [...prevTeams, newTeam]);
            setNewTeam('');
        } else {
            alert('Team name is either empty or already exists.');
        }
    };

    const filteredPlayers = players.filter(player => {
        return Object.keys(filters).every(key => {
            if (filters[key] === '') return true;
            if (key === 'isCaptain' || key === 'isViceCaptain') {
                return player[key] === (filters[key] === 'true');
            }
            return player[key] === filters[key];
        });
    });

    return (
        <div className="container">
            <header className="header">
                <h1>IPL Team Management System</h1>
            </header>
            <div className="upper-sections">
                <div className="section">
                    <h2>Filter Players</h2>
                    <FilterOptions onFilterChange={handleFilterChange} teams={teams} />
                </div>
                <div className="section">
                    <h2>Create/Edit Player</h2>
                    <PlayerForm player={editingPlayer} onSave={addOrUpdatePlayer} teams={teams} onCancel={() => setEditingPlayer(null)} />
                </div>
            </div>
            <div className="lower-section section">
                <h2>Player List</h2>
                <PlayerList players={filteredPlayers} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
            <div className="add-team-section">
                <h2>Add New Team</h2>
                <input
                    type="text"
                    value={newTeam}
                    onChange={(e) => setNewTeam(e.target.value)}
                    placeholder="New Team Name"
                />
                <button onClick={handleAddTeam}>Add Team</button>
            </div>
        </div>
    );
};

export default App;
