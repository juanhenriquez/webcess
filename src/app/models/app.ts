export interface App {
  id: number,
  name: string,
  img: string,
  icon: string,
  open: boolean,
  quantum: number,
  remainingQuantum?: number,
  size: number,
  ramReq: number,
  status: string,
  resources?: {
    sound?: boolean,
    camera?: boolean
  }
}