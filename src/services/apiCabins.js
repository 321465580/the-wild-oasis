import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("房间未加载");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  // 编辑的情况下，处理图片是否改变
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // 创建图片的名字和链接，数据库中存的是图片的地址
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1.创建或者编辑小屋
  let query = supabase.from("cabins");

  // 创建
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // 编辑
  if (id)
    query = query.update([{ ...newCabin, image: imagePath }]).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("添加失败");
  }
  // 2.上传图片
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. 如果上传错误，就删除上传的图片
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("cabin 图片上传失败导致删除 cabin");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("删除失败");
  }
  return data;
}
