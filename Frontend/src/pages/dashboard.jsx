import "../styles/dashboard.css";

export default function Dashboard() {
    return (
        <div className="dashboard">
            {/* NAVBAR */}
            <div className="navbar">
                <h2>Majesty</h2>
                <button>Logout</button>
            </div>

            {/*LANGUAGE SELECT */}
            <div className="controls">
                <select>
                    <option>English</option>
                    <option>French</option>
                    <option>Swahili</option>
                    <option>Chinese</option>
                </select>
            </div>

            {/* MIC BUTTON */}
            <div className="mic-section">
                <button className="mic-btn">Speak</button>
            </div>

            {/* OUTPUT */}
            <div className="grid">
                <div className="card">
                    <h3>Original Speech</h3>
                    <p>...</p>
                </div>

                <div className="card-blue">
                    <h3>Translation</h3>
                    <p>...</p>
                </div>
            </div>
        </div>
    );
}