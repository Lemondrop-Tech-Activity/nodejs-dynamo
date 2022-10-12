import { createServer, IncomingMessage, ServerResponse } from 'http'
import { companyRequest } from "./api/company";


const listener = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    // console.log(req)
    let result: string | object = ''
    if ((req.url as string).match('/company/leave(.*?)')) {
      //code here
    } else if ((req.url as string).match('/company(.*?)')) {
      result = await companyRequest(req) as string | object
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(result));
  } catch (error) {
    res.writeHead(400, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(error));
  }
}

const server = createServer(listener)
server.listen(8080)