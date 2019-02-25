import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
/*import CreateBlog from './components/createBlog'*/
/*import LoginForm from './components/loginForm'*/
import { useField } from './hooks'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, resetUsername] = useField('text')
  const [password, resetPassword] = useField('password')
  const [user, setUser] = useState(null)
  const [title, resetTitle] = useField('text')
  const [author, resetAuthor] = useField('text')
  const [url, resetUrl] = useField('text')
  const [message, setMessage] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  })

  useEffect(() => {
    const loggerUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggerUserJSON) {
      const user = JSON.parse(loggerUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username.value, password.value)

    try {
      const user = await loginService.login({
        username: username.value, password: password.value
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      /*setUsername('')
      setPassword('')*/
      resetUsername()
      resetPassword()
    } catch (exception) {
      console.log('käyttäjätunnus tai salasana virheellinen')
      setMessage('käyttäjätunnus tai salasana virheellinen')
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    }

  }

  const createBlog = async (event) => {
    event.preventDefault()

    try {
      await blogService.create({
        title: title.value, author: author.value, url: url.value
      })
      resetTitle()
      resetAuthor()
      resetUrl()
      setMessage(`Lisättiin kirjoittajan ${author.value} blogiteksti ${title.value}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)

    }
  }


  const blogForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>Luo blogiteksti</button>
        </div>

        <div style={showWhenVisible}>
          <div>
            <h2>Luo uusi</h2>
            <form onSubmit={createBlog}>
              <div>
                title:
                <input
                  {...title}
                />
              </div>
              <div>
                author:
                <input
                  {...author}
                />
              </div>
              <div>
                url:
                <input
                  {...url}
                />
              </div>
              <button type="submit">Luo</button>
            </form>
          </div>
          <button onClick={() => setBlogFormVisible(false)}>Peruuta</button>
        </div>
      </div>
    )
  }

  const blogList = () => {


    return (
      <div>
        <button onClick={logout}>Kirjaudu ulos</button>
        <br />
        <br />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        <br />
        {blogForm()}



      </div>
    )
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }

  const loginForm = () => {
    return (
      <div>
        <h2>Kirjaudu</h2>
        <form onSubmit={handleLogin}>
          <div>
            Käyttäjätunnus
            <input
              {...username}
            />
          </div>
          <div>
            Salasana
            <input
              {...password}
            />
          </div>
          <button type="submit">Kirjaudu sisään</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {message}
      {user === null ?
        /*<LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />*/
        <div>
          {loginForm()}
        </div>

        :
        <div>
          <p>{user.name} logged in</p>
          {blogList()}

        </div>
      }

    </div>
  )
}

export default App