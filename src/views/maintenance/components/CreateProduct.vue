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
        <!-- <el-form-item label="图片:" prop="img">
          <el-upload
            class="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :auto-upload="false"
            :show-file-list="false"
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
            :on-remove="handleRemove"
          >
            <img v-if="config.img" :src="config.img" class="avatar" />
            <BaseSvg icon="icon-tianjia" v-else />
            <template #file="{ file }"> </template>
          </el-upload>
        </el-form-item> -->
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
            <div class="img-content" v-if="config.img" @click="stopClick">
              <img :src="config.img" />
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
            <!-- <template #file="{ file }">
              <div class="img-content">
                <img :src="config.img" />
                <div class="mask">
                  <el-upload
                    action=""
                    :limit="1"
                    :show-file-list="false"
                    :auto-upload="false"
                    ref="uploadRef2"
                  >
                    <BaseSvg icon="icon-shangchuan" />
                  </el-upload>
                  <BaseSvg icon="icon-shanchu" @click="clearFiles" />
                </div>
              </div>
            </template> -->
          </el-upload>
        </el-form-item>
      </el-form>
    </BaseDrawer>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ref, reactive } from "vue";
import type { UploadProps, UploadFile, UploadFiles } from "element-plus";
withDefaults(
  defineProps<{
    visible: boolean;
  }>(),
  {
    visible: false,
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
    trigger: "change",
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

const uploadRef = ref();

const uploadRef2 = ref();

const emit = defineEmits(["close"]);

const stopClick = (e) => {
  e.stopPropagation();
};

const handleChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log("handleChange: ", uploadFile, uploadFiles);
  if (imgType.indexOf(uploadFile.raw?.type) === -1) {
    ElMessage.error("图片支持jpg, jpeg, gif, png");
    clearFiles();
    return;
  } else if (uploadFile.size && uploadFile.size > 1 * 1024 * 1024) {
    ElMessage.error("图片大小限制1MB");
    clearFiles();
    return;
  }
  config.img = URL.createObjectURL(uploadFile.raw!);
};

const handleSuccess: UploadProps["onSuccess"] = (response, uploadFile) => {
  config.img = URL.createObjectURL(uploadFile.raw!);
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
  }
}
</style>
