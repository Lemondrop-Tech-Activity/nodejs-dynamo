import { ExecuteStatementCommand } from "@aws-sdk/client-dynamodb";
import { map } from "lodash";
import { document } from "./document";
import {itemToData   } from "dynamo-converters";

export const execute = async (params :any) =>{
  try {
    const valuesResponse = await document.send(new ExecuteStatementCommand(params));
    console.log("Success. Item added.");
    return valuesResponse;
  } catch (err) {
    console.error(err);
    throw new Error("Unable to save");
  }
}

export const insertDB = async (tableName: string, statement: string, parameters: any[]) => {
  const params = {
    Statement: `INSERT INTO ${tableName} VALUE ${statement}`,
    Parameters: parameters
  };
  await execute(params)
  return "Successfully Save"
};

export const selectDB = async (tableName: string, statement: string = '') => {
  const query = statement.length > 0 ? `SELECT * FROM  ${tableName} WHERE ${statement}` : `SELECT * FROM  ${tableName}`
  const params = {
    Statement: query,
  };
  const resultList =  await execute(params)
  console.log(map(resultList.Items, (obj) => (obj)))
  return map(resultList.Items, (obj) => itemToData(obj))
}


