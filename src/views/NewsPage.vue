<script setup>
import { getJalaliDate } from '@/utils/dateUtils'

const todayJalali = getJalaliDate()
</script>

<template>
  <v-container class="py-6">
    <h1 class="text-h4 font-weight-bold text-center">اخبار و رویدادها</h1>

    <!-- separator with date -->
    <div style="width: 100%; max-width: 980px; margin: 24px auto 32px; position: relative;">
      <v-divider />
      <v-chip class="mx-auto" color="grey-lighten-1" variant="outlined" style="position: absolute; inset-inline: 0; top: -14px; width: fit-content; background: white;">
        {{ todayJalali }}
      </v-chip>
    </div>

    <div class="d-flex flex-column" style="gap: 48px; align-items: center;">
      <div v-for="item in 10" :key="item" style="width: 100%; max-width: 980px;">
        <v-img
          src="@/assets/images/news.png"
          alt="news-item"
          cover
          class="rounded-lg"
        />

        <v-sheet
          color="grey-lighten-4"
          class="rounded-lg"
          style="padding: 12px 16px; margin-top: -50px; margin-inline-end: 32px; width: min(100%, 680px);"
        >
          <h2 class="text-subtitle-1 font-weight-bold">اخبار {{ item }}</h2>
          <p class="text-body-2" style="color: rgba(0,0,0,0.6); text-align: right; line-height: 1.9;">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان
            گرافیکلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان
            گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای
            شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
            کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می
            طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و
            فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری
            موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی
            دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار
            گیرد.
          </p>
          <div class="d-flex justify-end" style="width: 100%;">
            <span class="text-body-2" style="color: white; background: #9e9e9e; padding: 4px 8px; border-radius: 8px; margin-inline-start: 32px; margin-top: -24px;">
              {{ todayJalali }}
            </span>
          </div>
        </v-sheet>
      </div>
    </div>
  </v-container>
</template>

<style lang="scss" scoped></style>
