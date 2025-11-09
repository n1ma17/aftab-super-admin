<script setup>
import { getJalaliDate } from '@/utils/dateUtils'

const todayJalali = getJalaliDate()
</script>

<template>
  <div class="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
    <h1 class="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[46px] font-bold text-center">
      اخبار و رویدادها
    </h1>
    <!-- seprator with text -->
    <div
      class="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] h-[1px] bg-gray-300 flex items-center justify-center my-6 sm:my-8 md:my-[32px]"
    >
      <span
        class="text-gray-500 text-[14px] sm:text-[18px] md:text-[20px] lg:text-[22px] bg-white px-2 sm:px-4"
      >
        {{ todayJalali }}
      </span>
    </div>
    <div
      class="news-list w-full flex flex-col items-center justify-start gap-8 sm:gap-12 md:gap-20 lg:gap-[152px]"
    >
      <div
        class="news-item w-full sm:w-[95%] md:w-[90%] lg:w-[80%] flex flex-col items-start justify-start"
        v-for="item in 10"
        :key="item"
      >
        <div class="news-item-content w-full flex flex-col items-start justify-center">
          <img
            src="@/assets/images/news.png"
            alt="news-item"
            class="w-full h-auto object-cover rounded-lg"
          />
        </div>

        <div
          class="w-full sm:w-[95%] md:w-[85%] lg:w-[60%] flex flex-col items-start justify-start gap-3 sm:gap-4 bg-gray-100 p-3 sm:p-4 rounded-lg mt-[-30px] sm:mt-[-40px] md:mt-[-50px] lg:mt-[-58px] mr-0 sm:mr-4 md:mr-6 lg:mr-[32px]"
        >
          <h2 class="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-bold">
            اخبار {{ item }}
          </h2>
          <span
            class="text-gray-500 text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-right leading-relaxed"
          >
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
          </span>
          <div class="flex items-end justify-end w-full">
            <span
              class="text-white text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] bg-gray-400 px-2 py-1 rounded-lg w-fit ml-0 sm:ml-4 md:ml-6 lg:ml-[32px] mb-[-20px] sm:mb-[-24px] md:mb-[-26px] lg:mb-[-28px]"
              >{{ todayJalali }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
