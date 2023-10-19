<template>
  <dl class="mx-auto max-w-2xl space-y-16 px-2 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0">
    <div v-for="(item, index) in features" :key="index">
      <dt class="text-base font-semibold leading-7 text-gray-900">{{ item.question }}</dt>
      <dd class="mt-2 text-base leading-7 text-gray-600">{{ item.answer }}</dd>
    </div>
  </dl>
</template>

<script lang="ts" setup>
const features = [
  {
    question: "Provable Timestamps",
    answer:
      "Ethereum provides verifiable timestamps for stored content, serving as indisputable proof of when data was added, eg. concept, idea or document.",
  },
  {
    question: "Trustless Environment",
    answer:
      "Content is immutable, ensuring it remains unchanged and authentic. The transparent nature of Ethereum means anyone can verify data, eliminating the need for trust.",
  },
  {
    question: "Serverless Accessibility",
    answer:
      "DApp exists on a decentralized network, eliminating central points of failure. Content is globally accessible to anyone with an internet connection.",
  },
  {
    question: "Ease of Use",
    answer:
      "Leveraging zkSync's native account abstraction, EraLink offers a user experience akin to familiar Web2 platforms.",
  },
  {
    question: "Easy Integration",
    answer: "Ethereum's robust ecosystem enables seamless integration with other DApps and decentralized services.",
  },
  {
    question: "Resilient Redundancy",
    answer:
      "Distributed nature of Ethereum ensures data is replicated across multiple nodes, guaranteeing content remains accessible even amidst node failures.",
  },
];
</script>
