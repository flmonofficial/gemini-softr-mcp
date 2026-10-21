import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
export default async function handler(req,res){
 res.setHeader("Access-Control-Allow-Origin","*");
 res.setHeader("Access-Control-Allow-Methods","GET, POST, OPTIONS");
 res.setHeader("Access-Control-Allow-Headers","Content-Type, Authorization, mcp-session-id, Accept");
 if(req.method==="OPTIONS") return res.status(200).end();
 if(req.method==="GET") return res.status(200).json({ok:true});
 const transport=new StreamableHTTPServerTransport({sessionIdGenerator:undefined,enableJsonResponse:true});
 const server=new Server({name:"gemini-softr-mcp",version:"1.0.0"},{capabilities:{tools:{}}});
 server.setRequestHandler({method:"tools/list"},async()=>{return{tools:[{name:"ping",description:"Test",inputSchema:{type:"object",properties:{},required:[]}}]}});
 server.setRequestHandler({method:"tools/call"},async()=>{return{content:[{type:"text",text:"Connected"}]}});
 await server.connect(transport); await transport.handleRequest(req,res,req.body);
}
