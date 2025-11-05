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
  <SharedCard showDivider class="w-full">
    <template #header>
      <div class="flex items-center gap-2 justify-start w-full">
        <ThemifyIcon name="comment-alt" size="32" class="text-primary-500" />
        <h2 class="text-2xl font-bold text-gray-800">اخبار</h2>
      </div>
    </template>
    <template #content>
      <div class="flex flex-col items-center gap-8 justify-start">
        <div
          class="flex items-center gap-2 justify-start w-full"
          v-for="item in news"
          :key="item.id"
        >
          <div class="flex items-center gap-2 justify-start w-full">
            <div class="flex flex-col items-start gap-2 justify-start">
              <h3 class="text-lg font-bold text-gray-800">{{ item.title }}</h3>
              <p class="text-sm text-gray-500">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </SharedCard>
</template>
