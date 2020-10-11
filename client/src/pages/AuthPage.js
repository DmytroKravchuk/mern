import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';

export const AuthPage = () => {
	const auth = useContext(AuthContext);
	const message = useMessage();
	const {loading, error, request, clearError} = useHttp();
	const [form, setForm] = useState({
		email: '',
		password: ''
	});

	useEffect(() => {
		message(error);
		clearError()
	},[error, message, clearError]);

	useEffect(() => {
		window.M.updateTextFields();
	},[])

	const changeHandler = e => {
		setForm({...form, [e.target.name]: e.target.value})
	}

	const registerHandler = async () => {
		try {
			const data = await request('/api/auth/register', 'POST', {...form});
			message(data.message);
		} catch (e) {}
	}

	const loginrHandler = async () => {
		try {
			const data = await request('/api/auth/login', 'POST', {...form});
			auth.login(data.token, data.userId)
		} catch (e) {}
	}
	
	return (
		<div className="row">
			<h1>Shorten the links</h1>
			<div className="col s6 offset-s3">
				<div className="card blue darken-1">
					<div className="card-content white-text">
					<span className="card-title">Card Title</span>
					<div>
						<div className="input-field">
							<input 
								placeholder="write the email" 
								id="email"
								type="text"
								className="yellow-input"
								name="email"
								onChange={changeHandler}/>
							<label htmlFor="email">Email:</label>
						</div>
						<div className="input-field">
							<input 
								placeholder="write the password" 
								id="password"
								type="password"
								className="yellow-input"
								name="password"
								onChange={changeHandler}/>
							<label htmlFor="email">Password:</label>
						</div>
					</div>
					</div>
					<div className="card-action">
						<button 
							className="btn yellow darken-4"
							style={{marginRight: "10px"}}
							onClick={loginrHandler}
							disabled={loading}
						>
							Log in
						</button>
						<button 
							className="btn grey lighten-1 black-text"
							onClick={registerHandler}
							disabled={loading}
						>
							Registration
						</button>
					</div>
				</div>	
			</div>
		</div>
	);
}
