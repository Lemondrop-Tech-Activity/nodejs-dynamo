import { IncomingMessage } from 'http'
import { getJSONDataFromRequestStream, getPathParams, getQueryParams } from '../util/generateParams'

export const companyRequest = async (req: IncomingMessage) => {
  const pathParam = getPathParams(req.url as string, '/company/:id')
  switch (req.method) {
    case 'POST':
      const result = await getJSONDataFromRequestStream(req)
      console.log(result)
      return 'Successfully Saved'
    case 'GET':
      const data = getQueryParams(req)
      const company = {
        'name': 'Workbean',
        'allocateLeaves': 2,
        'allocateOvertime': 2,
      }
      console.log(data?.column)
      if (!data?.column) return company
      else return { 'id': '1' }
    default:
      break;
  }
  return 'yes'
}