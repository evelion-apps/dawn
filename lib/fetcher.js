export default async function Fetcher(url, options) {
  const res = await fetch(url, options || {})

  if (!res.ok) {
    const error = handleError(res.status)
    throw error
  }

  return res.json()
}

// When using SWR, this functoin is called like:
//
//   const { data, error } = useSWR(
//     `${apiUrl}/`,
//     (url) => GraphQLFetcher(url, query, variables)
//   )
//
export async function GraphQLFetcher(url, query, variables) {
  const body = {
    query: query,
    variables: variables
  }

  const options = {
    body: JSON.stringify(body),
    method: 'POST',
  }

  return await Fetcher(url, options)
}

function handleError(errorCode) {
  let error

  switch (errorCode) {
    case 401:
      error = `It looks like the API did not authorize your request. Please ensure you have a valid API key.`
      break;
    case 404:
      error = `No results found. Check your query again or try searching for a different location.`
      break;
    case 429:
      error = `It looks like you've made too many requests to the server. Please wait a while before trying again.`
      break;
    default:
      error = `Server error`
      break;
  }

  return new Error(error)
}
