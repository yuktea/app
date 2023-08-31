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
