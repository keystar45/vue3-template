<template>
  <div class="create-product">
    <BaseDrawer
      :title="title"
      width="560px"
      :dialogVisible="visible"
      :showFoot="true"
      :submitLoading="submitLoading"
      @cancel="close"
      @confirm="addProduct"
    >
      <el-form
        :model="config"
        label-width="110px"
        :rules="formRules"
        ref="formRef"
      >
        <el-form-item label="产品名称:" prop="pdName">
          <el-input
            v-model="config.pdName"
            placeholder="请输入产品名称"
            maxlength="100"
            :disabled="!!id"
          />
        </el-form-item>
        <el-form-item label="产品描述:" prop="pdDesc">
          <el-input
            v-model="config.pdDesc"
            placeholder="请输入产品描述"
            maxlength="1000"
            show-word-limit
            type="textarea"
            :rows="4"
          />
        </el-form-item>
        <el-form-item label="专题库:" prop="categoryId">
          <el-select v-model="config.categoryId" placeholder="请选择专题库">
            <el-option
              v-for="item in libList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="应用成效:" prop="effect">
          <el-input
            v-model="config.effect"
            placeholder="请输入应用成效"
            maxlength="1000"
            show-word-limit
            type="textarea"
            :rows="4"
          />
        </el-form-item>
        <el-form-item label="产品提供方:" prop="pdProvider">
          <el-input
            v-model="config.pdProvider"
            placeholder="请输入产品提供方"
            maxlength="200"
          />
        </el-form-item>
        <el-form-item label="产品URL:" prop="pdUrl">
          <el-input v-model="config.pdUrl" placeholder="请输入产品URL" />
        </el-form-item>
        <el-form-item label="图片:" prop="pdImage">
          <el-upload
            class="img-upload"
            action=""
            :limit="1"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleChange"
            ref="uploadRef"
          >
            <div
              class="img-content"
              v-if="config.pdImage"
              @click="stopPropagations"
            >
              <img :src="config.pdImage" alt="Base64 Image" />
              <div class="mask">
                <el-upload
                  class="reupload"
                  action=""
                  :limit="1"
                  :show-file-list="false"
                  :auto-upload="false"
                  :on-change="handleChange"
                  ref="uploadRef2"
                >
                  <BaseSvg icon="icon-shangchuan" />
                </el-upload>
                <BaseSvg icon="icon-shanchu" @click="clearFiles" />
              </div>
            </div>
            <BaseSvg icon="icon-tianjia" v-else />
          </el-upload>
        </el-form-item>
      </el-form>
      <div class="hint">
        支持jpg, jpeg, gif, png，大小限制1M，建议图片比例16:9
      </div>
    </BaseDrawer>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ref, reactive, watch } from "vue";
import type { UploadFile, UploadFiles } from "element-plus";
import { stopPropagations } from "@/utils/common";
import { UploadImg, AddProduct } from "@/apis/maintenance";
import { ProductDetail, EditProduct } from "@/apis/maintenance";

const props = withDefaults(
  defineProps<{
    visible: boolean;
    id: string;
    libList: {
      id: number | string;
      name: string;
    }[];
  }>(),
  {
    visible: false,
    id: "",
    libList: () => [],
  }
);

const title = ref("新建产品");

const submitLoading = ref(false);

const config = reactive({
  pdName: "",
  pdDesc: "",
  categoryId: "",
  effect: "",
  pdProvider: "",
  pdUrl: "",
  pdImage: "",
});

const formRules = {
  pdName: {
    required: true,
    trigger: "blur",
    message: "请输入产品名称",
  },
  pdDesc: {
    required: true,
    trigger: "blur",
    message: "请输入产品描述",
  },
  categoryId: {
    required: true,
    trigger: "change",
    message: "请选择专题库",
  },
  effect: {
    required: true,
    trigger: "blur",
    message: "请输入应用效果",
  },
  pdProvider: {
    required: true,
    trigger: "blur",
    message: "请输入产品提供方",
  },
  pdUrl: {
    required: true,
    trigger: "blur",
    message: "请输入产品URL",
  },
  pdImage: {
    required: true,
    trigger: "blur",
    message: "请上传产品图片",
  },
};

const formRef = ref();

const imgType = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const imgUrl = ref("");
const uploadRef = ref();

const uploadRef2 = ref();

const emit = defineEmits(["close"]);

watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      if (props.id) {
        title.value = "编辑产品";
        getDetail();
      } else {
        title.value = "新建产品";
      }
    } else {
      formRef.value.resetFields();
      imgUrl.value = "";
    }
  }
);

const getDetail = () => {
  ProductDetail({ id: props.id }).then((res) => {
    for (let key in config) {
      config[key] = res.data[key];
    }
    imgUrl.value = config.pdImage;
  });
};

const handleChange = async (
  uploadFile: UploadFile,
  uploadFiles: UploadFiles
) => {
  console.log(uploadFile.raw, "handleChange: ", uploadFile, uploadFiles);
  if (imgType.indexOf(uploadFile.raw?.type || "") === -1) {
    ElMessage.error("图片仅支持jpg, jpeg, gif, png");
    if (!config.pdImage) {
      clearFiles();
    } else {
      setTimeout(() => {
        clearFiles();
        config.pdImage = imgUrl.value;
      });
    }
    return;
  } else if (uploadFile.size && uploadFile.size > 1 * 1024 * 1024) {
    ElMessage.error("图片大小限制1MB");
    if (!config.pdImage) {
      clearFiles();
    } else {
      setTimeout(() => {
        clearFiles();
        config.pdImage = imgUrl.value;
      });
    }
    return;
  }
  // config.pdImage = URL.createObjectURL(uploadFile.raw);
  // imgUrl.value = URL.createObjectURL(uploadFile.raw);
  const blob = new Blob([uploadFile.raw || ""], { type: uploadFile.raw?.type });
  const img = await upload(blob);
  config.pdImage = img;
  imgUrl.value = img;
  formRef.value.validateField("pdImage");
  setTimeout(() => {
    clearFiles();
    config.pdImage = imgUrl.value;
  });
};

const upload = (e: Blob): Promise<string> => {
  return new Promise((resolve) => {
    UploadImg({
      file: e,
    }).then((res) => {
      resolve(res.data);
    });
  });
};

const clearFiles = () => {
  uploadRef.value.clearFiles();
  uploadRef2.value.clearFiles();
  config.pdImage = "";
};

const close = (e?: number) => {
  emit("close", e);
  formRef.value.resetFields();
};

const addProduct = () => {
  formRef.value.validate((isValid) => {
    if (!isValid) return;
    submitLoading.value = true;
    let handleFun;
    let msg;
    if (props.id) {
      msg = "产品编辑成功";
      handleFun = EditProduct;
    } else {
      handleFun = AddProduct;
      msg = "产品新建成功";
    }
    handleFun({
      ...config,
      id: props.id,
    })
      .then(() => {
        ElMessage.success(msg);
        close(1);
      })
      .finally(() => (submitLoading.value = false));
  });
};
</script>

<style lang="scss" scoped>
.create-product {
  :deep(.base-drawer) {
    .el-select {
      width: 280px;
    }
    .el-textarea {
      max-width: 100%;
    }
    .img-upload {
      .el-upload {
        width: 240px;
        min-height: 135px;
        background: transparent;
        border-radius: 0;
        border: 1px dashed rgba(41, 52, 78, 0.15);
        .reupload {
          display: flex;
          .el-upload.el-upload--text {
            width: $height-xs;
            height: $height-xs;
            min-height: $height-xs;
            margin-right: $spacing-l;
            border: none;
          }
        }
        .svg {
          color: #d6dde7;
          font-size: 48px;
        }
        .img-content {
          position: relative;
          width: 100%;
          cursor: default;
          img {
            width: 100%;
            vertical-align: middle;
          }
          .mask {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            .svg {
              display: none;
              color: #fff;
              font-size: $font-size-l;
            }
            &:hover {
              background: rgba(41, 52, 78, 0.8);
              .svg {
                display: block;
              }
            }
          }
        }
      }
      .el-upload-list__item + .el-upload {
        display: none;
      }
    }
    .hint {
      font-size: $font-size-m;
      color: rgba(41, 52, 78, 0.65);
      line-height: 18px;
      padding-left: 110px;
      // margin-top: $spacing-s;
    }
  }
}
</style>
