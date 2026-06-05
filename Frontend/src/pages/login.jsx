import "../styles/auth.css";

export default function Login() {
    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="logo">Majesty</h1>
                <p className="subtitle">AI speech Translation Platform</p>

                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password"/>

                <button className="btn-primary">Login</button>
                <p className="switch">
                    Don't have an account?
                    <span>Regester</span>
                </p>
            </div>
        </div>
    );
}