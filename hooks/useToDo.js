import useSWR from 'swr'
import { Fetcher, GraphQLFetcher }from '../lib/fetcher'

const apiType = process.env.NEXT_PUBLIC_TO_DO_TYPE
const apiUrl = process.env.NEXT_PUBLIC_TO_DO_API_HOST

export function useToDo() {
  if (apiType === 'things-api') {
    return useToDoThingsApi()
  } else {
    return useToDoDefault()
  }
}

const useToDoDefault = () => ({
  toDoData: null,
  isLoading: false,
  isError: false,
})

const useToDoThingsApi = () => {
  const queryFields = [
    'uuid',
    'title',
    'areaString',
    'todayIndex',
    'status',
    'statusString',
    'type',
    'typeString',
    'startDate',
    'stopDate',
    'instanceCreationStartDate',
    'afterCompletionReferenceDate',
    'todayIndexReferenceDate',
  ]

  const query = `{ today { ${queryFields.join(' ')} }}`
  const variables = {}

  const { data, error } = useSWR(
    `${apiUrl}/`,
    (url) => GraphQLFetcher(url, query, variables)
  )

  return {
    toDoData: processToDoThingsApi(data),
    isLoading: !data && !error,
    isError: error,
  }
}

const processToDoThingsApi = function(data) {
  const items = data?.data?.today ? data.data.today : []

  let byAreaIndex = 0

  let byArea = items.reduce((acc, item) => {
    if (!acc[item.areaString]) {
      acc[item.areaString] = {
        title: item.areaString || 'General',
        items: [],
        index: byAreaIndex,
        totalToDoCompleted: 0,
        totalToDoOpen: 0,
        totalToDo: 0
      }

      byAreaIndex += 1
    }

    acc[item.areaString].items.push(item)

    if (item.typeString !== 'todo') {
      return acc
    }

    acc[item.areaString].totalToDo += 1

    if (item.statusString === 'complete') {
      acc[item.areaString].totalToDoCompleted += 1
    }

    if (item.statusString === 'open') {
      acc[item.areaString].totalToDoOpen += 1
    }

    return acc
  }, {})

  byArea = Object.values(byArea).sort((entry) => entry.index)

  return {
    byArea: byArea,
    items: items
  }
}
