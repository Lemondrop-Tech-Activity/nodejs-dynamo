import { v4 as uuidv4 } from 'uuid';
import { insertDB } from "../lib/database/query";

export default class company {
  id: string;
  name: string;
  allocateOvertime: number;
  allocateLeaves: number;
  private readonly __TABLE__ = 'Company'

  constructor( name: string, allocateOvertime: number, allocateLeaves: number, id: string | undefined = undefined) {
    this.name = name
    this.allocateOvertime = allocateOvertime
    this.allocateLeaves = allocateLeaves
    this.id = (id === undefined)? uuidv4() : id
  }
  /**
   * computation
   */
  public getComputedOvertime(overtime: number) {
    return this.allocateOvertime - overtime
  }
  /**
   * insert data
   */
  public async insert() {
    const stringFormat =  "{ 'id': ?, 'name': ?, 'allocateOvertime': ?, 'allocateLeaves': ? }"
    const params = [
      {S: this.id},
      {S: this.name},
      {N: `${this.allocateOvertime}`},
      {N: `${this.allocateLeaves}`}
    ]
    try {
      await insertDB(this.__TABLE__, stringFormat, params)
    } catch (err){
      console.error(err)
      throw new Error("Unable to save");
    }
  }
}