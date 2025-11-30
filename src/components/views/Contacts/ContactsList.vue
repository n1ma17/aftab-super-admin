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
  <v-container class="pa-6">
    <!-- Header -->
    <header style="margin-bottom: 32px;">
      <div class="d-flex align-center justify-space-between">
        <div>
          <h1 class="text-h4 font-weight-bold" style="margin-bottom: 4px;">📞 دفترچه تلفن</h1>
          <p class="text-body-2" style="color: rgba(0,0,0,0.6);">لیست مخاطبین شما</p>
        </div>
        <v-btn color="secondary" rounded="xl" class="font-weight-medium" @click="addNewContact">
          <ThemifyIcon name="plus" :size="18" style="margin-inline-start: 6px;" />
          افزودن مخاطب
        </v-btn>
      </div>
    </header>

    <!-- Search Bar -->
    <div style="margin-bottom: 32px;">
      <v-text-field
        v-model="searchQuery"
        variant="outlined"
        density="comfortable"
        :label="'جستجوی مخاطب...'"
        prepend-inner-icon="mdi-magnify"
        hide-details
      />
    </div>

    <!-- Contacts Grid -->
    <section>
      <v-row dense>
        <v-col v-for="(contact, index) in filteredContacts" :key="contact.id" cols="12" md="6" lg="4" xl="3">
          <SharedCard
            variant="outlined"
            :color="contact.color"
            :hoverable="true"
            :clickable="true"
            :animation-delay="index * 0.05"
            @click="viewContactDetails(contact)"
            class="w-100"
          >
            <template #header>
              <div class="d-flex flex-column align-center" style="width: 100%; text-align: center;">
                <!-- Avatar -->
                <div style="position: relative; margin-bottom: 12px;">
                  <v-avatar size="80">
                    <img :src="contact.avatar" :alt="contact.name" />
                  </v-avatar>
                  <div
                    style="position: absolute; bottom: 0; right: 0; width: 20px; height: 20px; border-radius: 9999px; border: 2px solid white;"
                    :style="{ background: contact.isOnline ? 'rgb(var(--v-theme-success))' : '#9e9e9e' }"
                  ></div>
                </div>

                <!-- Name -->
                <h3 class="text-subtitle-1 font-weight-bold" style="margin-bottom: 4px;">
                  {{ contact.name }}
                </h3>
                <p class="text-body-2" style="color: rgba(0,0,0,0.6); margin-bottom: 12px;">
                  {{ contact.position }}
                </p>
              </div>
            </template>

            <template #content>
              <!-- Contact Info -->
              <div class="d-flex flex-column" style="gap: 12px;">
                <!-- Phone -->
                <div class="d-flex align-center" style="gap: 12px; padding: 8px; background: #f6f6f6; border-radius: 8px;">
                  <div class="d-flex align-center justify-center" style="width: 32px; height: 32px; border-radius: 8px; background: rgba(var(--v-theme-info), 0.15);">
                    <ThemifyIcon name="mobile" :size="16" style="color: rgb(var(--v-theme-info));" />
                  </div>
                  <div style="flex: 1 1 auto; min-width: 0;">
                    <p class="text-caption" style="color: rgba(0,0,0,0.6); margin: 0;">شماره تلفن</p>
                    <p class="text-body-2 font-weight-semibold" style="margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                      {{ contact.phone }}
                    </p>
                  </div>
                </div>

                <!-- Email -->
                <div class="d-flex align-center" style="gap: 12px; padding: 8px; background: #f6f6f6; border-radius: 8px;">
                  <div class="d-flex align-center justify-center" style="width: 32px; height: 32px; border-radius: 8px; background: rgba(var(--v-theme-success), 0.15);">
                    <ThemifyIcon name="email" :size="16" style="color: rgb(var(--v-theme-success));" />
                  </div>
                  <div style="flex: 1 1 auto; min-width: 0;">
                    <p class="text-caption" style="color: rgba(0,0,0,0.6); margin: 0;">ایمیل</p>
                    <p class="text-body-2 font-weight-semibold" style="margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                      {{ contact.email }}
                    </p>
                  </div>
                </div>
              </div>
            </template>

            <template #footer>
              <div class="d-flex align-center" style="gap: 8px;">
                <v-btn color="success" class="flex-1 font-weight-medium" @click.stop="callContact(contact)">
                  <ThemifyIcon name="phone" :size="16" style="margin-inline-start: 6px;" />
                  تماس
                </v-btn>
                <v-btn color="info" class="flex-1 font-weight-medium" @click.stop="sendMessage(contact)">
                  <ThemifyIcon name="comment" :size="16" style="margin-inline-start: 6px;" />
                  پیام
                </v-btn>
                <v-btn color="error" variant="tonal" @click.stop="deleteContact(contact)">
                  <ThemifyIcon name="trash" :size="16" />
                </v-btn>
              </div>
            </template>
          </SharedCard>
        </v-col>
      </v-row>

      <!-- Empty State -->
      <div v-if="filteredContacts.length === 0" class="text-center" style="padding: 64px 0;">
        <div class="mx-auto" style="width: 96px; height: 96px; background: #f3f3f3; border-radius: 9999px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px;">
          <ThemifyIcon name="face-sad" :size="48" style="color: #bdbdbd;" />
        </div>
        <h3 class="text-h6 font-weight-bold" style="margin-bottom: 8px;">مخاطبی یافت نشد</h3>
        <p class="text-body-2" style="color: rgba(0,0,0,0.6);">با عبارت "{{ searchQuery }}" مخاطبی پیدا نشد.</p>
      </div>
    </section>
  </v-container>
</template>

<style lang="scss" scoped></style>
