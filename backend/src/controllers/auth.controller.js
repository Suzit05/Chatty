//routes bda na ho jaye , isliye hrr route k separate controller bnaya jaye


const signup = (req, res) => {
    res.send("sign up page 2")
}

const login = (req, res) => {
    res.send("login page 2")
}


const logout = (req, res) => {
    res.send("logout page 2")
}


module.exports = { signup, login, logout }