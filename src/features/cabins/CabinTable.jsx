import { useSearchParams } from "react-router-dom";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useCabins } from "./useCabins";

function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  // 拿到 url 中传递的需要排序的值，没有值的时候就是 null
  const filterValue = searchParams.get("discount") || "all";

  // 根据 url 中的信息，进行过滤操作
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // sort 排序
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  // 计算符号，根据排序的方向得出
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>房屋</div>
          <div>容量</div>
          <div>价格</div>
          <div>折扣</div>
          <div></div>
        </Table.Header>

        <Table.Body
          // data={cabins}
          // data={filteredCabins}
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
