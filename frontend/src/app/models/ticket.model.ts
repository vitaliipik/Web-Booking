
export interface TicketItem {
  address: string;
  date: Date;
  id: number;
  name: string;
  event_id: number;
  status: string;
  tickets_count: number;
  seat: string;
}


export interface TicketInput {
  event_id: string;
  status: string;
  user_id: number;
  seat: string;
}
