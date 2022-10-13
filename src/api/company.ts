import { IncomingMessage } from 'http'
import { getJSONDataFromRequestStream, getPathParams, getQueryParams } from '../util/generateParams'
import company from "../modules/company";
import { selectDB } from '../lib/database/query';

export const companyRequest = async (req: IncomingMessage) => {
  try {
    switch (req.method) {
      case 'POST':{
        
        const result = await getJSONDataFromRequestStream(req) as {name: string, allocateOvertime: number, allocateLeaves: number}
        const model = new company(result)
        await model.insert()
        return 'Successfully Saved'
      }
      case 'PUT': {
        const pathParam = getPathParams(req.url as string, '/company/:id')
        const result = await getJSONDataFromRequestStream(req) as {allocateOvertime: number, allocateLeaves: number}
        const model = new company(pathParam.id)
        await model.get()
        model.data = { ...model.data, ...result }
        await model.update()
        return "Successfully Update"
      }
      default: {
        // const data = getQueryParams(req)
        const listing = await selectDB('Company')
        return listing
      }
    }
  } catch (err: any) {
    throw new Error(err);
  }
  return 'yes'
}