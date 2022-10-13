import { createServer, IncomingMessage, ServerResponse } from 'http'
import { companyRequest } from "./api/company";


const listener = async (req: IncomingMessage, res: ServerResponse) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 2592000, // 30 days
    /** add other headers as per requirement */
    "Content-Type": "application/json"
  }
  try {
    
    if (req.method === "OPTIONS") {
      res.writeHead(204, headers);
      res.end();
      return;
    }
    // console.log(req)
    let result: string | object = ''
    if ((req.url as string).match('/company/leave(.*?)')) {
      //code here
    } else if ((req.url as string).match('/company(.*?)')) {
      result = await companyRequest(req) as string | object
    }
    res.writeHead(200, headers);
    res.end(JSON.stringify(result));
  } catch (error) {
    res.writeHead(400, headers);
    res.end(JSON.stringify(error));
  }
}

const server = createServer(listener)
server.listen(8080)