import React from "react";
import "../styles/Dashboard.css";

function MetricCard({ color,icon,value,unit,title,desc }){
    return (
            <div className="metric-card">
      <div className="metric-icon" style={{ color }}>
        {icon}
      </div>
      <div className="metric-value" style={{ color }}>
        {value}
      </div>
      <div className="metric-unit">{unit}</div>
      <h3 className="metric-title">{title}</h3>
      <p className="metric-desc">{desc}</p>
    </div>
    );
}

export default MetricCard;
