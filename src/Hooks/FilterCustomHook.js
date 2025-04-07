import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export function usePostFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type");
  const salePriceMax = searchParams.get("salePriceMax");
  const location = searchParams.get("location");
  const area = searchParams.get("areaMax");
  const landAreaMax = searchParams.get("landAreaMax");
  const buildingAreaMax = searchParams.get("buildingAreaMax ");
  const setFilters = useCallback((filters) => {
    setSearchParams((params) => {
      if (filters.type !== undefined) {
        params.set("type", filters.type);
      }
      if (filters.salePriceMax !== undefined) {
        params.set("salePriceMax", filters.salePriceMax);
      }
      if (filters.location !== undefined) {
        params.set("location", filters.location);
      }
      if (filters.area !== undefined) {
        params.set("area", filters.area);
      }
      if (filters.landAreaMax !== undefined) {
        params.set("landAreaMax", filters.landAreaMax);
      }
      if (filters.buildingAreaMax !== undefined) {
        params.set("buildingAreaMax", filters.buildingAreaMax);
      }
      return params;
    });
  }, []);
  return {
    searchParams,
    type,
    salePriceMax,
    location,
    area,
    landAreaMax,
    buildingAreaMax,
    setFilters,
  };
}
