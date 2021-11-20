import React from 'react'
import quotes from '../data/quotes-from-dwyl-quotes-github-repo.json'

const Quote = () => {
  const quote = quotes[Math.floor(Math.random()*quotes.length)]

  return (
    <div className="text-lg leading-tight">
      <span className="text-gray-900">&ldquo;{quote.text}&rdquo;</span>
      <span className="text-gray-500">{' '}&ndash; {quote.author}</span>
    </div>
  )
}

export default Quote
