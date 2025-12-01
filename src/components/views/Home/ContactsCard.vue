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
  <SharedCard showDivider>
    <template #header>
      <div class="d-flex align-center justify-space-between" style="width: 100%; gap: 12px">
        <div class="d-flex align-center" style="gap: 8px">
          <ThemifyIcon name="mobile" size="32" style="color: var(--v-theme-primary)" />
          <h2 class="text-h6 font-weight-bold">دفترچه تلفن</h2>
        </div>
        <v-btn
          color="secondary"
          class="font-weight-medium"
          rounded="xl"
          @click="router.push('/contacts')"
        >
          مخاطب
        </v-btn>
      </div>
    </template>
    <template #content>
      <v-list lines="one" style="height: 500px; width: 400px">
        <v-list-item
          v-for="item in contacts"
          :key="item.id"
          :title="item.name"
          :subtitle="item.position"
        >
          <template #prepend>
            <v-avatar size="40">
              <img :src="item.avatar" :alt="item.name" />
            </v-avatar>
          </template>
          <template #append>
            <div class="d-flex flex-column align-end" style="gap: 8px">
              <div class="d-flex align-center" style="gap: 6px">
                <span class="text-body-2" style="color: rgba(0, 0, 0, 0.6)">{{ item.phone }}</span>
                <ThemifyIcon name="mobile" size="16" style="color: var(--v-theme-primary)" />
              </div>
              <div class="d-flex align-center" style="gap: 6px">
                <span class="text-body-2" style="color: rgba(0, 0, 0, 0.6)">{{ item.email }}</span>
                <ThemifyIcon name="email" size="16" style="color: var(--v-theme-primary)" />
              </div>
            </div>
          </template>
        </v-list-item>
      </v-list>
    </template>
  </SharedCard>
</template>
