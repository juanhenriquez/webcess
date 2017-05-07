export interface App {
  id: number,
  name: string,
  img: string,
  icon: string,
  open: boolean,
  requirements?: {
    sound?: boolean,
    camera?: boolean
  }
}