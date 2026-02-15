export interface IUserPayload {
  patient: {
    email: string;
    name: string;
    contactNumber: string;
    address?: string;
  };

  password: string;
}
