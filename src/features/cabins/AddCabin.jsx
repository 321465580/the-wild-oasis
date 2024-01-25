import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

// function AddCabin() {
//   const [isOpenModel, setIsOpenModel] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setIsOpenModel((pre) => !pre)}>
//         添加新的小房屋
//       </Button>
//       {isOpenModel && (
//         <Modal onClose={() => setIsOpenModel(false)}>
//           <CreateCabinForm onCloseModel={() => setIsOpenModel(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

// 复合组件
function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add new Cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
