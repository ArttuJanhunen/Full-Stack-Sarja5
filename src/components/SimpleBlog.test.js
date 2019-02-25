import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import SimpleBlog from './simpleBlog'

afterEach(cleanup)


test('renders title and author', () => {


  const blog = {
    title: 'testienajootsikko',
    author: 'testikirjailija',
    likes: 50
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'testienajootsikko testikirjailija'
  )

  const element = component.getByText('testienajootsikko testikirjailija')
  expect(element).toBeDefined()

  const div = component.container.querySelector('.tekstiosio')
  expect(div).toHaveTextContent(
    'testienajootsikko testikirjailija'
  )
})



test('renders likes', () => {

  const blog = {
    title: 'testienajootsikko',
    author: 'testikirjailija',
    likes: 50
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    `blog has ${blog.likes} likes`
  )

  const element = component.getByText(`blog has ${blog.likes} likes`)
  expect(element).toBeDefined()

  const div = component.container.querySelector('.likeosio')
  expect(div).toHaveTextContent(
    `blog has ${blog.likes} likes`
  )

})



it('clicking like calls event handler', async () => {
  const mockHandler = jest.fn()

  const blog = {
    title: 'testienajootsikko',
    author: 'testikirjailija',
    likes: 50
  }

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)

})




