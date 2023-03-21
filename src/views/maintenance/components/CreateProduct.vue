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
        <el-form-item label="产品名称:" prop="name">
          <el-input
            v-model="config.name"
            placeholder="请输入产品名称"
            maxlength="100"
            :disabled="!!id"
          />
        </el-form-item>
        <el-form-item label="产品描述:" prop="desc">
          <el-input
            v-model="config.desc"
            placeholder="请输入产品描述"
            maxlength="1000"
            show-word-limit
            type="textarea"
            :rows="4"
          />
        </el-form-item>
        <el-form-item label="专题库:" prop="lib">
          <el-select v-model="config.lib" placeholder="请选择专题库">
            <el-option
              v-for="item in libList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="应用成效:" prop="result">
          <el-input
            v-model="config.result"
            placeholder="请输入应用成效"
            maxlength="1000"
            show-word-limit
            type="textarea"
            :rows="4"
          />
        </el-form-item>
        <el-form-item label="产品提供方:" prop="source">
          <el-input
            v-model="config.source"
            placeholder="请输入产品提供方"
            maxlength="200"
          />
        </el-form-item>
        <el-form-item label="产品URL:" prop="url">
          <el-input v-model="config.url" placeholder="请输入产品URL" />
        </el-form-item>
        <el-form-item label="图片:" prop="img">
          <el-upload
            class="img-upload"
            action=""
            :limit="1"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleChange"
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
            ref="uploadRef"
          >
            <div
              class="img-content"
              v-if="config.img"
              @click="stopPropagations"
            >
              <img :src="config.img" />
              <div class="mask">
                <el-upload
                  class="reupload"
                  action=""
                  :limit="1"
                  :show-file-list="false"
                  :auto-upload="false"
                  :on-change="handleChange"
                  :before-upload="beforeUpload"
                  :on-progress="onProgress"
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
import type {
  UploadProps,
  UploadFile,
  UploadFiles,
  UploadProgressEvent,
} from "element-plus";
import { stopPropagations } from "@/utils/common";

const props = withDefaults(
  defineProps<{
    visible: boolean;
    id: string;
  }>(),
  {
    visible: false,
    id: "",
  }
);

const title = ref("新建产品");

const submitLoading = ref(false);

const config = reactive({
  name: "",
  desc: "",
  lib: "",
  result: "",
  source: "",
  url: "",
  img: "",
});

const formRules = {
  name: {
    required: true,
    trigger: "blur",
    message: "请输入产品名称",
  },
  desc: {
    required: true,
    trigger: "blur",
    message: "请输入产品描述",
  },
  lib: {
    required: true,
    trigger: "change",
    message: "请选择专题库",
  },
  result: {
    required: true,
    trigger: "blur",
    message: "请输入应用效果",
  },
  source: {
    required: true,
    trigger: "blur",
    message: "请输入产品提供方",
  },
  url: {
    required: true,
    trigger: "blur",
    message: "请输入产品URL",
  },
  img: {
    required: true,
    trigger: "blur",
    message: "请上传产品图片",
  },
};

const formRef = ref();

const libList = ref<
  {
    label: string;
    value: string;
  }[]
>([]);

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
      } else {
        title.value = "新增产品";
      }
    } else {
      formRef.value.resetFields();
      imgUrl.value = "";
    }
  }
);

const handleChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log(uploadFile.raw, "handleChange: ", uploadFile, uploadFiles);
  if (imgType.indexOf(uploadFile.raw?.type) === -1) {
    ElMessage.error("图片支持jpg, jpeg, gif, png");
    if (!config.img) {
      clearFiles();
    } else {
      setTimeout(() => {
        clearFiles();
        config.img = imgUrl.value;
      });
    }
    return;
  } else if (uploadFile.size && uploadFile.size > 1 * 1024 * 1024) {
    ElMessage.error("图片大小限制1MB");
    if (!config.img) {
      clearFiles();
    } else {
      setTimeout(() => {
        clearFiles();
        config.img = imgUrl.value;
      });
    }
    return;
  }
  config.img = URL.createObjectURL(uploadFile.raw);
  imgUrl.value = URL.createObjectURL(uploadFile.raw);
  formRef.value.validateField("img");
  setTimeout(() => {
    clearFiles();
    config.img = imgUrl.value;
  });
};

const onProgress = (
  evt: UploadProgressEvent,
  uploadFile: UploadFile,
  uploadFiles: UploadFiles
) => {
  console.log(evt, uploadFile, uploadFiles);
};

const handleSuccess: UploadProps["onSuccess"] = (response, uploadFile) => {
  config.img = URL.createObjectURL(uploadFile.raw);
};

const beforeUpload: UploadProps["beforeUpload"] = (rawFile) => {
  console.log("rawFile.type", rawFile.type);
  if (imgType.indexOf(rawFile.type) === -1) {
    ElMessage.error("图片支持jpg, jpeg, gif, png");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 1) {
    ElMessage.error("大小限制1M");
    return false;
  }
  return true;
};

const clearFiles = () => {
  uploadRef.value.clearFiles();
  uploadRef2.value.clearFiles();
  config.img = "";
};

const close = () => {
  emit("close");
  formRef.value.resetFields();
};

const addProduct = () => {
  formRef.value.validate((isValid) => {
    if (!isValid) return;
    submitLoading.value = true;
    setTimeout(() => {
      submitLoading.value = false;
      close();
    }, 2000);
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
