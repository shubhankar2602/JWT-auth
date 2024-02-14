import styles from "./styles.module.css";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate} from "react-router-dom";


const cakeOptions = [
	{ name: 'Chocolate', price: 25 },
	{ name: 'Vanilla', price: 20 },
	{ name: 'Red Velvet', price: 28 },
	{ name: 'Carrot', price: 22 },
	{ name: 'Cheesecake', price: 30 },
  ];
const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	const [data, setData] = useState({
		subTotal:"",
		email: "",
	});

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/order";
			const { data: res } = await axios.post(url, data);
			navigate("/");
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	const [error, setError] = useState("");
	const navigate = useNavigate();

	const [selectedCakes, setSelectedCakes] = useState([]);

	const handleCakeSelection = (e) => {
	  const { name, checked } = e.target;
	  const updatedSelection = checked
		? [...selectedCakes, name]
		: selectedCakes.filter((cake) => cake !== name);
	  setSelectedCakes(updatedSelection);
	};
  
	const calculateSubtotal = () => {
	  return selectedCakes.reduce((accumulator, cake) => {
		const cakePrice = cakeOptions.find((option) => option.name === cake).price;
		return accumulator + cakePrice;
	  }, 0);
	};
	const total = calculateSubtotal();
	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Voosh</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			
			<div className="order-form">
				<h2 style={{ color: 'lightgreen' }}>Order Your Delicious Cakes</h2>
				<form onSubmit={handleSubmit}>
					{cakeOptions.map((cakeOption) => (
					<label key={cakeOption.name} style={{ display: 'block' }}>
						<input
						type="checkbox"
						name={cakeOption.name}
						checked={selectedCakes.includes(cakeOption.name)}
						onChange={handleCakeSelection}
						/>
						{cakeOption.name} ({cakeOption.price} Rs)
					</label>
					))}
					<br />
					<label style={{ color: 'lightgreen' }}>
					Subtotal:  
						<input type="text" name='subTotal' value= {calculateSubtotal()} readonly />
					</label>
					<br />
					<label>Confirm Your Phone number </label> 
					<input type="" />
					<br />
					<button type="submit" style={{ backgroundColor: 'lightgreen' }}>
					Order Now
					</button>
				</form>
			</div>
		</div>
	);
};

export default Main;


