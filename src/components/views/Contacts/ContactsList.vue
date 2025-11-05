<script setup>
import SharedCard from '@/components/shared/SharedCard.vue'
import ThemifyIcon from '@/components/icons/ThemifyIcon.vue'
import { computed, ref } from 'vue'

// Search Query
const searchQuery = ref('')
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
// Filtered Contacts
const filteredContacts = computed(() => {
  if (!searchQuery.value) return contacts.value

  const query = searchQuery.value.toLowerCase()
  return contacts.value.filter(
    contact =>
      contact.name.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query) ||
      contact.phone.includes(query) ||
      contact.position.toLowerCase().includes(query)
  )
})
// Methods
const viewContactDetails = contact => {
  console.log('مشاهده جزئیات:', contact.name)
  alert(
    `مشاهده اطلاعات ${contact.name}\n\nموقعیت: ${contact.position}\nتلفن: ${contact.phone}\nایمیل: ${contact.email}`
  )
}

const callContact = contact => {
  console.log('تماس با:', contact.name)
  alert(`در حال برقراری تماس با ${contact.name}...\n${contact.phone}`)
}

const sendMessage = contact => {
  console.log('ارسال پیام به:', contact.name)
  alert(`ارسال پیام به ${contact.name}\n${contact.email}`)
}

const deleteContact = contact => {
  if (confirm(`آیا از حذف ${contact.name} مطمئن هستید؟`)) {
    const index = contacts.value.findIndex(c => c.id === contact.id)
    if (index !== -1) {
      contacts.value.splice(index, 1)
      alert(`${contact.name} با موفقیت حذف شد.`)
    }
  }
}

const addNewContact = () => {
  alert('فرم افزودن مخاطب جدید باز می‌شود...')
  // می‌توانید اینجا یک Modal برای افزودن مخاطب جدید باز کنید
}
</script>

<template>
  <div class="p-6">
    <!-- Header -->
    <header class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold text-gray-900 mb-2">📞 دفترچه تلفن</h1>
          <p class="text-gray-600">لیست مخاطبین شما</p>
        </div>
        <button
          @click="addNewContact"
          class="px-6 py-3 bg-secondary text-white rounded-xl hover:bg-secondary-600 transition-all duration-300 hover:scale-105 flex items-center gap-2"
        >
          <ThemifyIcon name="plus" :size="18" />
          <span>افزودن مخاطب</span>
        </button>
      </div>
    </header>

    <!-- Search Bar -->
    <div class="mb-8">
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="جستجوی مخاطب..."
          class="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
        />
        <ThemifyIcon
          name="search"
          :size="20"
          class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>
    </div>

    <!-- Contacts Grid -->
    <section>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <SharedCard
          v-for="(contact, index) in filteredContacts"
          :key="contact.id"
          variant="elevated"
          :color="contact.color"
          :hoverable="true"
          :clickable="true"
          :animation-delay="index * 0.05"
          @click="viewContactDetails(contact)"
        >
          <template #header>
            <div class="flex flex-col items-center w-full text-center">
              <!-- Avatar -->
              <div class="relative mb-3">
                <img
                  :src="contact.avatar"
                  :alt="contact.name"
                  class="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div
                  class="absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-white"
                  :class="contact.isOnline ? 'bg-success-500' : 'bg-gray-400'"
                ></div>
              </div>

              <!-- Name -->
              <h3 class="text-lg font-bold text-gray-800 mb-1">
                {{ contact.name }}
              </h3>
              <p class="text-sm text-gray-500 mb-3">{{ contact.position }}</p>
            </div>
          </template>

          <template #content>
            <!-- Contact Info -->
            <div class="space-y-3">
              <!-- Phone -->
              <div
                class="flex items-center gap-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div
                  class="w-8 h-8 bg-info-100 rounded-lg flex items-center justify-center flex-shrink-0"
                >
                  <ThemifyIcon name="mobile" :size="16" class="text-info-500" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs text-gray-500">شماره تلفن</p>
                  <p class="text-sm font-semibold text-gray-800 truncate">{{ contact.phone }}</p>
                </div>
              </div>

              <!-- Email -->
              <div
                class="flex items-center gap-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div
                  class="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center flex-shrink-0"
                >
                  <ThemifyIcon name="email" :size="16" class="text-success-500" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs text-gray-500">ایمیل</p>
                  <p class="text-sm font-semibold text-gray-800 truncate">{{ contact.email }}</p>
                </div>
              </div>
            </div>
          </template>

          <template #footer>
            <div class="flex items-center gap-2">
              <button
                @click.stop="callContact(contact)"
                class="flex-1 px-4 py-2 bg-success-500 text-white rounded-lg hover:bg-success-600 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <ThemifyIcon name="phone" :size="16" />
                <span class="text-sm font-medium">تماس</span>
              </button>
              <button
                @click.stop="sendMessage(contact)"
                class="flex-1 px-4 py-2 bg-info-500 text-white rounded-lg hover:bg-info-600 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <ThemifyIcon name="comment" :size="16" />
                <span class="text-sm font-medium">پیام</span>
              </button>
              <button
                @click.stop="deleteContact(contact)"
                class="px-3 py-2 bg-error-500 text-white rounded-lg hover:bg-error-600 transition-all duration-200"
              >
                <ThemifyIcon name="trash" :size="16" />
              </button>
            </div>
          </template>
        </SharedCard>
      </div>

      <!-- Empty State -->
      <div v-if="filteredContacts.length === 0" class="text-center py-16">
        <div
          class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <ThemifyIcon name="face-sad" :size="48" class="text-gray-400" />
        </div>
        <h3 class="text-xl font-bold text-gray-800 mb-2">مخاطبی یافت نشد</h3>
        <p class="text-gray-500">با عبارت "{{ searchQuery }}" مخاطبی پیدا نشد.</p>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped></style>
