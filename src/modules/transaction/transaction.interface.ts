
import { Schema, Types } from 'mongoose';
export type TransactionType = 'deposit' | 'withdraw' | 'transfer' | 'cash_in' | 'cash_out';
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'reversed';

export interface ITransaction {
  from?: Types.ObjectId; // initiator (user or agent)
  to?: Types.ObjectId;   // recipient (for transfer/cash-in)
  user?: Types.ObjectId;
  type: TransactionType;
  balance: number;
  fee?: number;
  status: TransactionStatus;
  narrative?: string;
  prevBalance: number;         
  newBalance: number;           
}