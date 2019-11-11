import React from 'react'
import { render, fireEvent, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import axiosMock from 'axios'
import App from '../App'
import data from './App.test.data'

test('loads and displays trees', async () => {
  const url = 'https://s3.eu-central-1.amazonaws.com/ecosia-frontend-developer/trees.json'
  const { getByText, getAllByRole } = render(<App />)

  axiosMock.get.mockResolvedValueOnce({ data })
  fireEvent.click(getByText('Load awesome trees'))

  await waitForElement(() => getAllByRole('heading'))

  expect(axiosMock.get).toHaveBeenCalledTimes(1)
  expect(axiosMock.get).toHaveBeenCalledWith(url)
  expect(getAllByRole('heading')[0]).toHaveTextContent('Baobab')
})