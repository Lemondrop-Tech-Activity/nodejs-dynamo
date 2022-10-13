import { v4 as uuidv4 } from 'uuid';
import { insertDB, selectDB, updateDB } from "../lib/database/query";
import { values, keys, map} from 'lodash'

interface dataInput {
  id?: string
  name?: string
  allocateOvertime: number
  allocateLeaves: number
  email?: string
  username? : string
}

export default class company {
  data: dataInput = {
    allocateOvertime: 0,
    allocateLeaves: 0
  };
  id: string = ""
  private readonly __TABLE__ = 'Company'

  constructor(params: string| dataInput) {
    if (typeof params === 'string') {
      this.id = params
    } else {
      this.data = {...this.data, ...params}
    }
  }
  public async get() {
    try {
      const result = await selectDB(this.__TABLE__, `id = '${this.id}'`)
      if (result.length === 0) throw new Error("Not found");
      else {
        this.data = {...this.data, ...result[0]}
        // this.data.id = id
        console.log(this.data)
      }
    } catch (err){
      console.error(err)
      throw new Error("Unable to update");
    }
  }
  /**
   * insert data
   */
  public async insert() {
    this.data.id = uuidv4()
    const stringFormat =  "{ 'id': ?, 'name': ?, 'allocateOvertime': ?, 'allocateLeaves': ? }"
    const params = [
      this.data.id,
      this.data.name,
      this.data.allocateOvertime,
      this.data.allocateLeaves
    ]
    try {
      await insertDB(this.__TABLE__, stringFormat, params)
    } catch (err){
      console.error(err)
      throw new Error("Unable to save");
    }
  }
  /**
   * name
   */
  public async update() {
    const updateFormat = JSON.parse(JSON.stringify(this.data))
    delete updateFormat.id
    delete updateFormat.name
    const fields = keys(updateFormat)
    const newValues = values(updateFormat)
    const updateStatement = map(fields, (field) => `${field} = ? `)
    const where = `id='${this.data.id}' AND name='${this.data.name}'`
    console.log(newValues)
    
    try {
      await updateDB(this.__TABLE__,updateStatement.join(), newValues, where )
    } catch (err){
      console.error(err)
      throw new Error("Unable to update");
    }
  }
}