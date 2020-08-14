export default interface ICreateItemDTO {
  user_id: string;
  name: string;
  category_id: string;
  size?: string;
  price?: number;
}
