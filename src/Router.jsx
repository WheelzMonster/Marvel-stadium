import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import RandomCombat from "./components/RandomCombat.jsx"
import SelectedCombat from "./components/SelectedCombat.jsx"
import Main from "./components/Main.jsx"
import "./App.css"

const MyRouter = () => {
	return (
		<Router>
			<div>
				<Switch>
					<Route path='/random' component={RandomCombat} />
					<Route path='/selected' component={SelectedCombat} />
					<Route path='/' exact component={Main} />
				</Switch>
			</div>
		</Router>
	)
}

export default MyRouter
