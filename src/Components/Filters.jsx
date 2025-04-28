import { usePostFilter } from "../Hooks/FilterCustomHook";

const Filters = () => {
  const {
    salePriceMax,
    location,
    area,
    landAreaMax,
    buildingAreaMax,
    type,
    setFilters,
  } = usePostFilter();
  return (
    <div className="border-primary flex h-auto w-[25%] flex-col gap-5 rounded-lg border">
      <div
        className="top border-primary flex items-center justify-center border-b pb-3"
        dir="rtl"
      >
        <h3 className="text-secondary text-xl">بحث بحسب:</h3>
      </div>
      <div
        className="areas flex flex-col items-center justify-center"
        dir="rtl"
      >
        <h3 className="text-secondary border-primary w-full border-b pb-3 text-center text-xl">
          نوع العقار:
        </h3>
        <select
          id="countries"
          value={location}
          onChange={(e) => setFilters({ type: e.target.value })}
          className="text-secondary border-primary block w-full rounded-lg border-b p-2.5 text-xl"
        >
          <option selected>اختر نوع العقار</option>
          <option value="house">منزل</option>
          <option value="villa">فيلا</option>
          <option value="commercial_store">محل تجاري</option>
        </select>
      </div>
      <div
        className="areas flex flex-col items-center justify-center"
        dir="rtl"
      >
        <h3 className="text-secondary border-primary w-full border-b pb-3 text-center text-xl">
          المدن:
        </h3>
        <select
          id="countries"
          value={location}
          onChange={(e) => setFilters({ location: e.target.value })}
          className="text-secondary border-primary block w-full rounded-lg border-b p-2.5 text-xl"
        >
          <option selected>اختر المدينة</option>
          <option value="دمشق">دمشق</option>
          <option value="حلب">حلب</option>
          <option value="حماة">حماة</option>
          <option value="اللاذقية">اللاذقية</option>
          <option value="طرطوس">طرطوس</option>
          <option value="الحسكة">الحسكة</option>
        </select>
      </div>
      <div
        className="prices flex flex-col items-center justify-center"
        dir="rtl"
      >
        <h3 className="text-secondary border-primary w-full border-b pb-3 text-center text-xl">
          السعر:
        </h3>
        <select
          id="price"
          value={salePriceMax}
          onChange={(e) => setFilters({ salePriceMax: e.target.value })}
          className="text-secondary block w-full rounded-lg border-b p-2.5 text-xl"
        >
          <option selected>اختر سعر المبيع الاقصى</option>
          <option value="100"> 100$</option>
          <option value="150">150$</option>
          <option value="300">300$</option>
          <option value="800">800$</option>
          <option value="1000">1000$</option>
          <option value="3000">3000$</option>
          <option value="5000">5000$</option>
          <option value="8000">8000$</option>
          <option value="10000">10000$</option>
        </select>
      </div>
      {type !== "villa" && (
        <div
          className="prices flex flex-col items-center justify-center"
          dir="rtl"
        >
          <h3 className="text-secondary border-primary w-full border-b pb-3 text-center text-xl">
            المساحة:
          </h3>
          <select
            value={area}
            onChange={(e) => setFilters({ area: e.target.value })}
            className="text-secondary block w-full rounded-lg p-2.5 text-xl"
          >
            <option selected>اختر المساحة القصوى</option>
            <option value="50"> 50m </option>
            <option value="100">100m</option>
            <option value="300">300m</option>
            <option value="500"> 500m</option>
            <option value="1000"> 1000m</option>
            <option value="2000"> 2000m</option>
            <option value="5000"> 5000m</option>
          </select>
          <img
            src="/images/filters.jpg"
            alt="filter"
            loading="lazy"
            className="w-full rounded-br-lg rounded-bl-lg"
          />
        </div>
      )}
      {type === "villa" && (
        <>
          <div
            className="prices flex flex-col items-center justify-center"
            dir="rtl"
          >
            <h3 className="text-secondary border-primary w-full border-b pb-3 text-center text-xl">
              المساحة:
            </h3>
            <select
              value={buildingAreaMax}
              onChange={(e) => setFilters({ buildingAreaMax: e.target.value })}
              className="text-secondary block w-full rounded-lg p-2.5 text-xl"
            >
              <option selected>اختر مساحة الفيلا القصوى</option>
              <option value="50"> 50m </option>
              <option value="100">100m</option>
              <option value="300">300m</option>
              <option value="500"> 500m</option>
              <option value="1000"> 1000m</option>
              <option value="2000"> 2000m</option>
              <option value="5000"> 5000m</option>
            </select>
          </div>
          <div
            className="prices flex flex-col items-center justify-center"
            dir="rtl"
          >
            <select
              value={landAreaMax}
              onChange={(e) => setFilters({ landAreaMax: e.target.value })}
              className="text-secondary block w-full rounded-lg p-2.5 text-xl"
            >
              <option selected>اختر مساحة الارض القصوى</option>
              <option value="50"> 50m </option>
              <option value="100">100m</option>
              <option value="300">300m</option>
              <option value="500"> 500m</option>
              <option value="1000"> 1000m</option>
              <option value="2000"> 2000m</option>
              <option value="5000"> 5000m</option>
            </select>
            <img
              src="/images/filters.jpg"
              alt="filter"
              loading="lazy"
              className="w-full rounded-br-lg rounded-bl-lg"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Filters;
