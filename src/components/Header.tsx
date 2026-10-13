import './Header.css';
function Header(){
    return(
        <header className="header">
                    <h2>BankOne</h2>
                    <img src="./src/assets/logo.png" alt="bank logo" height="100" />
                    <div className="user-info">
                        Welcome, Fareha
                    </div>
                </header>
    )
}
export default Header;