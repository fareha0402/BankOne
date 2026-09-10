import './Login.css';
import { useState } from 'react';
import authService from './authService';
import { useNavigate } from 'react-router-dom';

function Login(){
    const navigate = useNavigate();
    const [formData, setFormData ] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
     
    const validate = () =>{
        const newError = {}
        if(!formData.email){
            newError.email = 'Email is required';
        }
        else if(!/\S+@\S+\.\S+/.test(formData.email)){
            newError.email = 'Email is invalid';
        }
        if(!formData.password){
            newError.password = 'Password is required';
        }
        else if(formData.password.length < 8){
            newError.password = 'Password must be at least 8 characters';
        }
        setErrors(newError);
        return Object.keys(newError).length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        if(!validate()){
            return;
        }
        //API call to the backend to authenticate the user
        setLoading(true);        
        const result = authService.loginUser(formData);
        console.log(result);
        if(result.success){
            // Store the user data and token in local storage or context
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', result.token);
            navigate('/dashboard'); // Redirect to the dashboard page after successful login
        }
        else{
            setErrors({form: 'Invalid email or password'});
        }
        setLoading(false);
       
    };
    return (
        <div className="login-content">
            <h1>Welcome Back</h1>

            <p>Sign in to access your account</p>

            <form className="login-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" autoComplete="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}/>
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" autoComplete="current-password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Login'}
                </button>
                {errors.form && <span className="error">{errors.form}</span>}
            </form>
        </div>
    )
}
export default Login;