import './Login.css';

function Login(){
    return (
        <div className="login-content">
            <h1>Welcome Back</h1>

            <p>Sign in to access your account</p>

            <form className="login-form">
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" autoComplete="email" />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" autoComplete="current-password" />
                </div>

                <button type="submit">
                    Sign In
                </button>
            </form>
        </div>
    )
}
export default Login;