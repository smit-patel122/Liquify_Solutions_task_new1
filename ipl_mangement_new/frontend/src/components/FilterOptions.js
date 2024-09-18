import React from 'react';

const FilterOptions = ({ onFilterChange, teams }) => {
    const handleChange = (e) => {
        onFilterChange(e.target.name, e.target.value);
    };

    return (
        <div>
            <select name="role" onChange={handleChange}>
                <option value="">All Roles</option>
                <option value="Batsman">Batsman</option>
                <option value="Bowler">Bowler</option>
                <option value="All Rounder">All Rounder</option>
                <option value="WK">WK</option>
            </select>
            <select name="isCaptain" onChange={handleChange}>
                <option value="">All Captains</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
            <select name="isViceCaptain" onChange={handleChange}>
                <option value="">All Vice-Captains</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
            <select name="team" onChange={handleChange}>
                <option value="">All Teams</option>
                {teams.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
        </div>
    );
};

export default FilterOptions;
