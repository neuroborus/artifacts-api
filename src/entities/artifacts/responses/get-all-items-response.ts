import { DataItem } from '../data-item';

interface GetAllItemsResponse {
  data: DataItem[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
