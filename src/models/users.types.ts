export type Users = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: User[];
};

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
};
