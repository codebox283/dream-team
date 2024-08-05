import React, { useState, useEffect } from 'react';
import './PlayerTable.css';

// Define types for the player and team data
interface Player {
  name: string;
  team: string;
  credits: number;
}

interface TeamStats {
  [teamName: string]: {
    count: number;
    credits: number;
  };
}

const PlayerTable: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<Set<string>>(new Set());
  const [teamStats, setTeamStats] = useState<TeamStats>({});

  useEffect(() => {
    // Fetch data from the JSON file
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => setPlayers(data));
  }, []);

  useEffect(() => {
    // Update team stats whenever selectedPlayers or players change
    const stats: TeamStats = {};
    players.forEach((player) => {
      if (!stats[player.team]) {
        stats[player.team] = { count: 0, credits: 0 };
      }
      if (selectedPlayers.has(player.name)) {
        stats[player.team].count ++;
        stats[player.team].credits += player.credits;
      }
    });
    setTeamStats(stats);
  }, [players, selectedPlayers]);

  const togglePlayer = (name: string) => {
    setSelectedPlayers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(name)) {
        newSet.delete(name);
      } else {
        newSet.add(name);
      }
      return newSet;
    });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Team</th>
            <th>Credits</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.name}>
              <td>{player.name}</td>
              <td>{player.team}</td>
              <td>{player.credits}</td>
              <td>
                <button onClick={() => togglePlayer(player.name)}>
                  {selectedPlayers.has(player.name) ? 'Remove' : 'Add'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {Object.keys(teamStats).map((team) => (
          <div key={team}>
            {team}: {teamStats[team].count}  {team} Credits: {teamStats[team].credits}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerTable;
