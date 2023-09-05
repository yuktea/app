// get all todos
app.get('/todos/:userEmail', async (req, res) => {
  const { userEmail } = req.params
  try {
    const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail])
    res.json(todos.rows)
  } catch (err) {
    console.error(err)
  }
})
// create a new todo
app.post('/todos', async(req, res) => {
  const { user_email, title, progress, date } = req.body
  const id = uuidv4()
  try {
    const newToDo = await pool.query(`INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5)`,
      [id, user_email, title, progress, date])
    res.json(newToDo)
  } catch (err) {
    console.error(err)
  }
})
// signup
app.post('/signup', async (req, res) => {
  const { email, password } = req.body
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)

  try {
    const signUp = await pool.query(`INSERT INTO users (email, hashed_password) VALUES($1, $2)`,
      [email, hashedPassword])
  
    const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' })
    
    res.json({ email, token })
  } catch (err) {
    console.error(err)
    if (err) {
      res.json({ detail: err.detail})
    }
  }
})


// login
app.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const users = await pool.query('SELECT * FROM users WHERE email = $1', [email])

    if (!users.rows.length) return res.json({ detail: 'User does not exist!' })
    
    const success = await bcrypt.compare(password, users.rows[0].hashed_password)
    const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' })

    if (success) {
      res.json({ 'email' : users.rows[0].email, token})
    } else {
      res.json({ detail: "Login failed"})
    }
  } catch (err) {
    console.error(err)
  }
})

