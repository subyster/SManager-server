export default interface ICreateUserDTO {
  name: string;
  surname: string;
  cpf: number;
  phone: number;
  gender: 'M' | 'F' | 'N';
  address: string;
  neighborhood: string;
  city: string;
  uf: string;
  email: string;
  password: string;
}
