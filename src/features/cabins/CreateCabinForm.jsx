import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreactCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  // react query 处理创建和编辑的逻辑
  const { isCreateLoading, createCabin } = useCreateCabin();
  const { isEditLoading, editCabin } = useEditCabin();

  const isWorking = isCreateLoading || isEditLoading;

  // 拿到传递过来的数据
  const { id: editId, ...editValues } = cabinToEdit;
  // 对 id 进行 boolean，有 id 就是 true，没有 id 就是 false
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  // 拿到表单中的校验错误
  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image: image }, id: editId },
        {
          onSuccess: (data) => {
            console.log(data);
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        // 不仅可以在创建 mutation 的时候调用 onSuccess，也可以在调用 mutation 的时候传递 onSuccess
        {
          onSuccess: (data) => {
            console.log(data);
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(error) {
    console.log(error);
  }

  return (
    // 校验通过，触发第一个函数，没有通过触发第二个函数
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "model" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "这个表单是必填项",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "这个表单是必填项",
            min: {
              value: 1,
              message: "居住人至少是一个",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "这个表单是必填项",
          })}
        />
      </FormRow>

      <FormRow label="Discount" errors={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            required: "这个表单是必填项",
            // 自定义校验规则
            validate: (value) =>
              value <= getValues().regularPrice || "折扣应该小于价格",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", {
            required: "这个表单是必填项",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" errors={errors?.image?.message}>
        <FileInput
          id="image"
          type="file"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "这个表单是必填项",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreateLoading}>
          {isEditSession ? "Edit Cabin" : "Add Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
