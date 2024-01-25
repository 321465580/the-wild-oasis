import styled from "styled-components";

import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreactCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  // 删除 cabin 的钩子函数，封装了 react-query
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreateLoading, createCabin } = useCreateCabin();

  const {
    id: cabindId,
    image,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
  } = cabin;

  function copyCabin() {
    createCabin({
      name: `copy of ${name}`,
      image,
      maxCapacity,
      regularPrice,
      discount,
      description,
    });
  }

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>房屋最大居住{maxCapacity}人</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}

      {/* 三个按钮和弹出框 */}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle toggleId={cabindId} />
            {/* 根据 id 连接起来，点击哪一行的，展开哪一行的 */}
            <Menus.List id={cabindId}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                disabled={isCreateLoading}
                onClick={copyCabin}
              >
                复制
              </Menus.Button>

              {/* 编辑按钮，和他的弹出框 */}

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>编辑</Menus.Button>
              </Modal.Open>

              {/* 删除按钮，和他的弹出框 */}
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>删除</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>

          {/* 编辑的弹出框 */}
          <Modal.Window name="edit">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>
          {/* 删除的弹出框 */}
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="cabins"
              disabled={isDeleting}
              onConfirm={() => deleteCabin(cabindId)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
