<template>
  <div class="login bg-[#F1F1F1] h-[90vh] mt-[120px]">
    <div class="w-2/3 mx-auto h-full">
      <RouteLinkVue :route="route" />
      <div class="center flex items-center justify-center flex-col">
        <h1 class="align-center text-2xl py-6 text-[#000a] font-semibold">
          {{ $t("choosenProduct") }}
        </h1>
        <div class="card bg-white p-6">
          <form>
            <div class="py-2">
              <input class="border w-72 border-[#0003] px-2 py-2 outline-1 outline-[#0005] text-sm"
                v-model="phoneNumber" type="tel" name="phoneNumber" id="phoneNumber" />
              <p v-if="error === 1 || error === 3" class="text-xs pl-2 py-1 font-medium text-red-500">
                {{ $t("loginErr2") }}
              </p>
            </div>
            <div class="py-2">
              <input class="border w-72 border-[#0003] px-2 py-2 outline-1 outline-[#0005] text-sm" v-model="clientName"
                type="text" name="textName" id="textName" :placeholder="$t('name')" />
              <p v-if="error === 2 || error === 3" class="text-xs pl-2 py-1 font-medium text-red-500">
                {{ $t("loginErr1") }}
              </p>
            </div>
            <ButtonPrimaryVue class="my-3" @click.prevent="handleClick" link="">{{ $t("send") }}</ButtonPrimaryVue>
          </form>

          <div class="text-xs my-3">{{ $t("connectwith") }}:</div>
          <div class="grid grid-cols-4 gap-4">
            <a href="#" class="minicards bg-blue-700 h-8 flex items-center justify-center">
              <i class="fa-brands fa-telegram text-white text-[20px]"></i>
            </a>
            <a href="#" class="minicards bg-pink-600 h-8 flex items-center justify-center">
              <i class="fa-brands fa-youtube text-white text-[20px]"></i>
            </a>
            <a href="#" class="minicards bg-blue-400 h-8 flex items-center justify-center">
              <i class="fa-brands fa-twitter text-white"></i>
            </a>
            <a href="#" class="minicards bg-red-700 h-8 flex items-center justify-center">
              <i class="fa-brands fa-instagram text-white"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <RouterView />
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import axios from "@/plugins/axios";
import RouteLinkVue from "../RouteLink.vue";
import ButtonPrimaryVue from "../ButtonPrimary.vue";
import { useCardStore } from "../../stores/cardStore";
import { useToast } from "vue-toastification";
const store = useCardStore();

const toast = useToast();

const router = useRoute();

const phoneNumber = ref("+998");
const clientName = ref("");
const error = ref(0);
const socialLinks = ref([]);

const route = reactive([{ name: "home", link: "/" }, { name: "login" }]);

async function handleClick() {
  if (phoneNumber.value === "+998" && !clientName.value) {
    error.value = 3;
  } else if (phoneNumber.value === "+998") {
    error.value = 1;
  } else if (!clientName.value) {
    error.value = 2;
  } else if (String(phoneNumber.value).length === 12 && clientName.value) {
    error.value = 0;
  }
  let str = String(phoneNumber.value).slice(3, -1);

  const byOneProduct = {
    full_name: clientName.value,
    phone_number: Number(str),
    products: [
      {
        product_id: router.query.id,
        product_title: router.query.name,
        ordered_amount: router.query.count,
      },
    ],
  };

  const byMoreProducts = {
    full_name: clientName.value,
    phone_number: Number(str),
    products: store.byProducts,
  };

  const resShop = router.query.name ? byOneProduct : byMoreProducts;

  if (resShop.products.length > 0) {
    await axios
      .post("/information/app-form/", resShop)
      .then((res) => {
        console.log(res);
        toast.success("Muvaffaqiyatli yuborildi");
      })
      .catch((err) => {
        toast.error("Xatolik yuz berdi!");
      });

    phoneNumber.value = "+998";
    clientName.value = "";
  }
  else {
    toast.error("Mahsulot tanlanmagan!");
  }
}

const fetchSocialLinks = () => {
  axios.get("information/social-media/").then((res) => {
    socialLinks.value = res.data;
  });
};

onMounted(() => {
  fetchSocialLinks();
});
</script>
