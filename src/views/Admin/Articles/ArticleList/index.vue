<!--
* @fileName ArticleList
* @author yq
* @date 2020/10/20 16:20:05
!-->
<template>
  <div class="articleList-wrap">
    <div class="table-top">
      <a-button type="primary" @click="add">添加</a-button>
    </div>
    <div class="table">
      <a-table
        :data-source="articleList.list"
        rowKey="id"
        bordered
        :pagination="false"
      >
        <a-table-column key="id" title="id" data-index="id" :width="80" />
        <a-table-column
          key="title"
          title="标题"
          data-index="title"
          :width="200"
        />
        <a-table-column key="tags" title="标签">
          <template v-slot="{ record }">
            <a-tag v-for="tag in record.tags" :key="tag" :color="tag.color">
              {{ tag.name }}
            </a-tag>
          </template>
        </a-table-column>
        <a-table-column
          key="category_name"
          title="类别"
          data-index="category_name"
          :width="100"
        />
        <a-table-column
          key="create_time"
          title="添加时间"
          data-index="create_time"
        />
        <a-table-column
          key="update_time"
          title="更新时间"
          data-index="update_time"
        />
        <a-table-column key="action" title="操作">
          <template v-slot="{ record }">
            <a-button
              class="btn"
              type="info"
              size="small"
              @click="edit(record)"
            >
              编辑
            </a-button>
            <a-button
              class="btn"
              type="danger"
              size="small"
              @click="remove(record)"
            >
              删除
            </a-button>
          </template>
        </a-table-column>
      </a-table>
      <div class="paging">
        <a-pagination
          :total="articleList.pagination.total"
          :showTotal="() => `Total ${articleList.pagination.total}`"
          show-quick-jumper
          @change="jump"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import useGetData from "./ts/useGetData";
import { Article } from "./ts/types";
import server from "@/utils/axios";
import api from '@/utils/api'
export default defineComponent({
  name: "ArticleList",
  setup() {
    const router = useRouter();
    const add = () => {
      router.push("/addArticle");
    };
    const { articleList, getData } = useGetData();
    const jump = (curr: number) => {
      getData(curr);
    };
    const edit = (item: Article) => {
      router.push(`/addArticle?id=${item.id}`);
    };
    const remove = async (item: Article) => {
      await server.request({
        url: api.deleteArticle,
        method: "post",
        data: {
          id: item.id,
        },
      });
      getData(1);
    };
    return {
      articleList,
      add,
      edit,
      remove,
      jump,
    };
  },
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
