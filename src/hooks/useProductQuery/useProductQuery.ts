import { ProductApi } from "@/apis";
import { QUERY_KEY } from "@/constants";
import { useQuery } from "@/modules/Query";

export default function useProductQuery() {
  return useQuery({
    queryFn: ProductApi.getAllProducts,
    queryKey: QUERY_KEY.product,
    initialData: { content: [] },
  });
}
