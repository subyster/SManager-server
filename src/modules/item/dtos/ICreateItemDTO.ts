export default interface ICreateItemDTO {
  user_id: string;
  name: string;
  category_name: string;
  size?: string;
  price?: number;
  avatar?: string;
}
