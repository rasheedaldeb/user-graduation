import { useSearchParams } from "react-router-dom";

export function usePostFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("company");
  const type = searchParams.get("type");
  const salePrice = searchParams.get("salePrice");
  const location = searchParams.get("location");
}
