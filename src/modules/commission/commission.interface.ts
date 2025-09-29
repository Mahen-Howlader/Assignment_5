import { Types } from "mongoose";

export interface ICommission {
  agent: Types.ObjectId;           
  type: "cash-in" | "cash-out";    
  commission: number;              
  amount: number;                  
}    