import { IncomingMessage } from 'http'
import { getJSONDataFromRequestStream, getPathParams, getQueryParams } from '../util/generateParams'
import company from "../modules/company";
import { selectDB } from '../lib/database/query';

export const companyRequest = async (req: IncomingMessage) => {
  const pathParam = getPathParams(req.url as string, '/company/:id')
  try {
    switch (req.method) {
      case 'POST':
        const result = await getJSONDataFromRequestStream(req) as {name: string, allocateOvertime: number, allocateLeaves: number}
        const model = new company(result.name, result.allocateOvertime, result.allocateLeaves)
        await model.insert()
        return 'Successfully Saved'
      case 'GET':
        // const data = getQueryParams(req)
        const listing = await selectDB('Company')
        return listing
      default:
        break;
    }
  } catch (err: any) {
    throw new Error(err);
  }
  return 'yes'
}