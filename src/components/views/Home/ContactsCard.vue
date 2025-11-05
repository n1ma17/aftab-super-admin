<script setup>
import { ref } from 'vue'
import SharedCard from '@/components/shared/SharedCard.vue'
import ThemifyIcon from '@/components/icons/ThemifyIcon.vue'
import { useRouter } from 'vue-router'

// Contacts Array
const contacts = ref([
  {
    id: 1,
    name: 'علی احمدی',
    position: 'مدیر فنی',
    phone: '0912-345-6789',
    email: 'ali.ahmadi@example.com',
    avatar: 'https://i.pravatar.cc/150?img=11',
    color: 'primary',
    isOnline: true,
  },
  {
    id: 2,
    name: 'سارا محمدی',
    position: 'طراح UI/UX',
    phone: '0913-456-7890',
    email: 'sara.mohammadi@example.com',
    avatar: 'https://i.pravatar.cc/150?img=47',
    color: 'secondary',
    isOnline: true,
  },
  {
    id: 3,
    name: 'محمد رضایی',
    position: 'توسعه‌دهنده فرانت‌اند',
    phone: '0914-567-8901',
    email: 'mohammad.rezaei@example.com',
    avatar: 'https://i.pravatar.cc/150?img=12',
    color: 'info',
    isOnline: false,
  },
  {
    id: 4,
    name: 'فاطمه کریمی',
    position: 'مدیر پروژه',
    phone: '0915-678-9012',
    email: 'fatemeh.karimi@example.com',
    avatar: 'https://i.pravatar.cc/150?img=45',
    color: 'success',
    isOnline: true,
  },
  {
    id: 5,
    name: 'حسین نوری',
    position: 'توسعه‌دهنده بک‌اند',
    phone: '0916-789-0123',
    email: 'hossein.noori@example.com',
    avatar: 'https://i.pravatar.cc/150?img=13',
    color: 'warning',
    isOnline: false,
  },
  {
    id: 6,
    name: 'مریم صادقی',
    position: 'متخصص SEO',
    phone: '0917-890-1234',
    email: 'maryam.sadeghi@example.com',
    avatar: 'https://i.pravatar.cc/150?img=44',
    color: 'error',
    isOnline: true,
  },
  {
    id: 7,
    name: 'امیر حسینی',
    position: 'DevOps Engineer',
    phone: '0918-901-2345',
    email: 'amir.hosseini@example.com',
    avatar: 'https://i.pravatar.cc/150?img=14',
    color: 'primary',
    isOnline: true,
  },
  {
    id: 8,
    name: 'زهرا عباسی',
    position: 'تحلیلگر داده',
    phone: '0919-012-3456',
    email: 'zahra.abbasi@example.com',
    avatar: 'https://i.pravatar.cc/150?img=43',
    color: 'secondary',
    isOnline: false,
  },
])
const router = useRouter()
</script>

<template>
  <SharedCard showDivider class="w-fit">
    <template #header>
      <div class="flex items-center gap-2 justify-between w-full">
        <div class="flex items-center gap-2 justify-start w-full">
          <ThemifyIcon name="mobile" size="32" class="text-primary-500" />
          <h2 class="text-2xl font-bold text-gray-800">دفترچه تلفن</h2>
        </div>
        <button
          @click="router.push('/contacts')"
          class="px-6 py-2 bg-secondary text-white rounded-xl hover:bg-secondary-600 transition-all duration-300 hover:scale-105 flex items-center gap-2"
        >
          <span> مخاطب</span>
        </button>
      </div>
    </template>
    <template #content>
      <div class="flex flex-col items-center gap-8 justify-start">
        <div
          class="flex items-center gap-6 justify-start w-full"
          v-for="item in contacts"
          :key="item.id"
        >
          <div class="flex items-center gap-2 justify-start w-full">
            <img :src="item.avatar" :alt="item.name" class="w-10 h-10 rounded-full object-cover" />
            <div class="flex flex-col items-center gap-2 justify-start">
              <h3 class="text-lg font-bold text-gray-800">{{ item.name }}</h3>
              <p class="text-sm text-gray-500">{{ item.position }}</p>
            </div>
          </div>
          <div class="flex flex-col items-end gap-2 justify-end w-full">
            <div class="flex items-center gap-2 justify-end w-full">
              <p class="text-sm text-gray-500">{{ item.phone }}</p>
              <ThemifyIcon name="mobile" size="16" class="text-primary-500" />
            </div>
            <div class="flex items-center gap-2 justify-end w-full">
              <p class="text-sm text-gray-500">{{ item.email }}</p>
              <ThemifyIcon name="email" size="16" class="text-primary-500" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </SharedCard>
</template>
