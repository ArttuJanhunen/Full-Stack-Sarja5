import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className="tekstiosio">
      {blog.title} {blog.author}
    </div>
    <div className="likeosio">
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog