<template>
  <div>
    <footer class="container flex flex-col items-center gap-4 pb-4 pt-12 sm:flex-row sm:justify-between sm:gap-6">
      <div class="text-left text-sm text-gray-400">
        Made with ❤️ by
        <a
          class="font-medium text-blue-700 transition hover:text-blue-800"
          href="https://github.com/JackHamer09"
          target="_blank"
        >
          JackHamer
        </a>
      </div>
      <a
        href="https://github.com/JackHamer09/eralink"
        title="zkSync Plus GitHub page"
        target="_blank"
        rel="noopener"
        class="flex w-max items-center gap-1.5 gap-x-1.5 whitespace-nowrap rounded-3xl bg-white/50 p-1 px-3 text-sm text-gray-500 shadow-md shadow-blue-800/5 ring-1 ring-gray-600/[.15] transition hover:bg-white hover:text-gray-900 hover:shadow-xl hover:shadow-blue-800/5 hover:ring-gray-300"
      >
        <span>View source code</span>
        <IconsGitHub class="h-7 w-7" />
      </a>
    </footer>
  </div>
</template>

<script lang="ts" setup></script>
