import "./navigation.css";
import searchIcon from "../../icons/loupe.svg";
import logo from "../../icons/logo.svg";

const Navigation = function (props) {
	return (
		<nav className="nav">
			<img className="logo" alt="weather app logo" src={logo} />
			<form className="search" onSubmit={props.onSearchInputSubmit}>
				<input
					className="search__input"
					type="text"
					placeholder={props.location}
					onChange={props.onSearchInputChange}
				/>
				<img
					className="search__icon"
					alt="loupe icon"
					src={searchIcon}
				/>
			</form>
			<div className="scale">
				<p className="scale-switch__label scale-switch__label--active">
					&deg;F
				</p>
				<div className="scale-switch">
					<div className="scale-switch__circle"></div>
				</div>
				<p className="scale-switch__label">&deg;C</p>
			</div>
		</nav>
	);
};

export default Navigation;
