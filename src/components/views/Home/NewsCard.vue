<script setup>
import { ref } from 'vue'
import SharedCard from '@/components/shared/SharedCard.vue'
import ThemifyIcon from '@/components/icons/ThemifyIcon.vue'

// News Array
const news = ref([
  {
    id: 1,
    title: 'لورم ایپسوم متن ساختگی',
    description:
      'کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. ',
  },
  {
    id: 2,
    title: 'لورم ایپسوم متن ساختگی',
    description:
      'کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. ',
  },
  {
    id: 3,
    title: 'لورم ایپسوم متن ساختگی',
    description:
      'کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. ',
  },
])
</script>

<template>
  <SharedCard showDivider>
    <template #header>
      <div class="d-flex align-center" style="gap: 8px">
        <ThemifyIcon name="comment-alt" size="32" style="color: var(--v-theme-primary)" />
        <h2 class="text-h6 font-weight-bold">اخبار</h2>
      </div>
    </template>
    <template #content>
      <v-list lines="two" style="height: 500px; width: 400px; overflow-y: auto">
        <v-list-item v-for="item in news" :key="item.id">
          <div class="d-flex flex-column" style="gap: 6px; width: 100%">
            <h3 class="text-subtitle-1 font-weight-bold">{{ item.title }}</h3>
            <p class="text-body-2" style="color: rgba(0, 0, 0, 0.6)">{{ item.description }}</p>
          </div>
        </v-list-item>
      </v-list>
    </template>
  </SharedCard>
</template>
