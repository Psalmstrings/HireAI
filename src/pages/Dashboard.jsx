import { useEffect, useState } from "react";
import "../homepage.css";
import Sidebar from "../components/Sidebar";

// Chart.js
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Dashboard() {

  const [stats] = useState({
    totalScreened: 42,
    suitable: 18,
    partiallySuitable: 12,
    notSuitable: 12,
  });

  const barData = {
    labels: ["Suitable", "Partial", "Not Suitable"],
    datasets: [
      {
        label: "Candidates",
        data: [stats.suitable, stats.partiallySuitable, stats.notSuitable],
        backgroundColor: ["#4e5bff", "#ffda6b", "#ff6b6b"],
        borderRadius: 10,
      },
    ],
  };

  const doughnutData = {
    labels: ["Suitable", "Partial", "Not Suitable"],
    datasets: [
      {
        data: [stats.suitable, stats.partiallySuitable, stats.notSuitable],
        backgroundColor: ["#4e5bff", "#ffda6b", "#ff6b6b"],
      },
    ],
  };

  return (
    <div className="dashboard">

      <Sidebar />
      

      {/* MAIN CONTENT */}
      <main className="content">

        <h1 className="title">AI Screening Insights</h1>

        {/* TOP STATS */}
        <div className="stats-grid">

          <div className="stat-card">
            <h3>Total Screened</h3>
            <p>{stats.totalScreened}</p>
          </div>

          <div className="stat-card">
            <h3>Suitable</h3>
            <p>{stats.suitable}</p>
          </div>

          <div className="stat-card">
            <h3>Partially Suitable</h3>
            <p>{stats.partiallySuitable}</p>
          </div>

          <div className="stat-card">
            <h3>Not Suitable</h3>
            <p>{stats.notSuitable}</p>
          </div>

        </div>



        {/* CHARTS */}
        <div className="charts">

          <div className="chart-card">
            <h3>Candidate Distribution</h3>
            <Bar data={barData} />
          </div>

          <div className="chart-card">
            <h3>Suitability Ratio</h3>
            <Doughnut data={doughnutData} />
          </div>

        </div>



        {/* RECENT TABLE */}
        <div className="table-card">
          <h3>Recent Screening Results</h3>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Score</th>
                <th>Suitability</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Samuel</td>
                <td>Frontend Dev</td>
                <td>92%</td>
                <td className="green">Suitable</td>
              </tr>

              <tr>
                <td>Ada</td>
                <td>UI Designer</td>
                <td>68%</td>
                <td className="yellow">Partial</td>
              </tr>

              <tr>
                <td>Tunde</td>
                <td>Backend Dev</td>
                <td>31%</td>
                <td className="red">Not Suitable</td>
              </tr>
            </tbody>
          </table>

        </div>

      </main>

    </div>
  );
}