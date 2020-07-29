export default interface ICreateItemDTO {
  name: string;
  price: number;
  category: 'Roupas' | 'Livros' | 'Acessórios';
}
