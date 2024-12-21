import React, { useState } from 'react';
import Leads from './Leads';
import Sales from './Sales';
import Pending from './Pending';
import Manage from './Manage';
import '../css/dashboard/Dashboard.css'; 
import Monitor from './Monitor';
import Navbar from '../specific/LeadsNavbar';

const Dashboard = () => {
  const [selectedCard, setSelectedCard] = useState("SALES");

  const cards = [
    { text: "PENDING", component: <Pending /> },
    { text: "LEADS", component: <Leads /> },
    { text: "SALES", component: <Sales /> },
    { text: "MONITOR", component: <Monitor /> },
    { text: "MANAGE", component: <Manage /> },
  ];

  const handleCardClick = (text) => {
    setSelectedCard(text);
  };

  return (
    <div className="dashboard-container">
   
      <div className="main-content">
        <div className="sidebar">
          {cards.map(({ text }, index) => (
            <div
              key={index}
              className={`card ${selectedCard === text ? 'selected' : ''}`}
              onClick={() => handleCardClick(text)}
            >
              {text}
            </div>
          ))}
        </div>
        <div className="component-container">
          {cards.find(card => card.text === selectedCard)?.component}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
