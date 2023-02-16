<template>
    <header
        class="sticky top-0 left-0 transition duration-150 mb-6"
        ref="header"
    >
        <div class="py-2">
            <div class="container">
                <div class="flex justify-between items-center">
                    <a
                        class="block no-underline"
                        href="#"
                    >
                        <img
                            class="block w-14 h-14"
                            src="@/assets/images/logo.svg"
                            alt="Lorem ipsum"
                        />
                    </a>

                    <BaseIcon
                        class="fa-solid fa-circle-info"
                        @click="toggleModal"
                    />
                </div>
            </div>
        </div>
    </header>

    <BaseModal
        :show="showModal"
        @close="() => (showModal = false)"
        title="Модальное окно окно окно окно окно"
    >
        <div class="content">
            <p>
                Каждый из нас понимает очевидную вещь: внедрение современных
                методик требует от нас анализа благоприятных перспектив.
                Приятно, граждане, наблюдать, как активно развивающиеся страны
                третьего мира призывают нас к новым свершениям, которые, в свою
                очередь, должны быть преданы социально-демократической анафеме.
                Высокий уровень вовлечения представителей целевой аудитории
                является четким доказательством простого факта: внедрение
                современных методик влечет за собой процесс внедрения и
                модернизации укрепления моральных ценностей.
            </p>

            <p>
                Учитывая ключевые сценарии поведения, разбавленное изрядной
                долей эмпатии, рациональное мышление прекрасно подходит для
                реализации системы массового участия. Есть над чем задуматься:
                интерактивные прототипы набирают популярность среди определенных
                слоев населения, а значит, должны быть заблокированы в рамках
                своих собственных рациональных ограничений. Как уже неоднократно
                упомянуто, сделанные на базе интернет-аналитики выводы набирают
                популярность среди определенных слоев населения, а значит,
                должны быть обнародованы.
            </p>
        </div>
    </BaseModal>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BaseIcon from "./BaseIcon.vue";
import BaseModal from "./BaseModal.vue";

const header = ref(null);
const showModal = ref(false);

onMounted(() => {
    const headerScrolledClasses = ["bg-indigo-50/95"];
    let ticking = false;

    function onScroll() {
        const scrollPos = window.scrollY;

        if (scrollPos >= header.value.offsetHeight) {
            header.value.classList.add(headerScrolledClasses);
        } else {
            header.value.classList.remove(headerScrolledClasses);
        }
    }

    onScroll();

    document.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                onScroll();
                ticking = false;
            });

            ticking = true;
        }
    });
});

function toggleModal() {
    showModal.value = true;
}
</script>
