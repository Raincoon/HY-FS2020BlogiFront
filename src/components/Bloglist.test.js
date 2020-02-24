import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import Blogform from './Blogform'

const testBlog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
}


describe('Blog listing', () => {
    test('shows only title and author by default', () => {
        const component = render(<Blog blog={testBlog} />)

        expect(component.container).toHaveTextContent("React patterns")
        expect(component.container).toHaveTextContent("Michael Chan")
        expect(component.container).not.toHaveTextContent("https://reactpatterns.com/")
    })

    test('shows all info expanded', () => {
        const component = render(<Blog blog={testBlog} />)
        const button = component.getByText('view')
        fireEvent.click(button)

        expect(component.container).toHaveTextContent("https://reactpatterns.com/")
        expect(component.container).toHaveTextContent("likes 7")
    })
    test('clicking \'like\' twice calls function twice', () => {
        const mockHandler = jest.fn()
        const component = render(<Blog blog={testBlog} edit={mockHandler} />)

        const view = component.getByText('view')
        fireEvent.click(view)

        const like = component.getByText('like')
        fireEvent.click(like)
        fireEvent.click(like)

        expect(mockHandler.mock.calls.length).toBe(2)
    })
})
describe('Blog Form', () => {
    const mockNotes = jest.fn()
    const mockForm = jest.fn()
    test('field input data matches form creation data', () => {
        const component = render(<Blogform submit={mockForm} notif={mockNotes} />)

        const titleField = component.container.querySelector('.titleField')
        const authorField = component.container.querySelector('.authorField')
        const urlField = component.container.querySelector('.urlField')
        const form = component.container.querySelector('form')

        fireEvent.change(titleField, {
            target: { value: "title" }
        })
        fireEvent.change(authorField, {
            target: { value: "author" }
        })
        fireEvent.change(urlField, {
            target: { value: "new url" }
        })
        fireEvent.submit(form)

        expect(mockForm.mock.calls.length).toBe(1)
        expect(mockForm.mock.calls[0][0]).toEqual({
            "title": "title",
            "author": "author",
            "url": "new url"
        })
    })
})