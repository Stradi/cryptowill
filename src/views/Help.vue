<template>
  <div class="max-w-5xl mx-auto">
    <p v-html="html" class="unreset"></p>
  </div>
</template>

<script>
import marked from "marked";
import helpMarkdown from "../assets/help.md";

export default {
  name: "Help",
  data: () => {
    return {
      html: marked(helpMarkdown)
    }
  }
}
</script>

<style lang="scss">
.unreset {
  a {
    @apply text-blue-700;
    @apply underline;
  }
  p {
    @apply my-4;
  }

  blockquote,
  figure {
    @apply my-4;
    @apply mx-10;
  }

  hr {
    @apply border;
  }

  h1 {
    @apply text-4xl;
    @apply font-bold;
    @apply my-2;
  }

  h2 {
    @apply text-2xl;
    @apply font-bold;
    @apply my-3;
  }

  h3 {
    @apply text-lg;
    @apply font-bold;
    @apply my-4;
  }

  h4 {
    @apply text-base;
    @apply font-bold;
    @apply my-5;
  }

  h5 {
    @apply text-sm;
    @apply font-bold;
    @apply my-6;
  }

  h6 {
    @apply text-xs;
    @apply font-bold;
    @apply my-10;
  }

  article,
  aside,
  nav,
  section {
    h1 {
      @apply text-2xl;
      @apply font-bold;
      @apply my-3;
    }

    article,
    aside,
    nav,
    section {
      h1 {
        @apply text-lg;
        @apply font-bold;
        @apply my-4;
      }

      article,
      aside,
      nav,
      section {
        h1 {
          @apply text-base;
          @apply font-bold;
          @apply my-5;
        }

        article,
        aside,
        nav,
        section {
          h1 {
            @apply text-sm;
            @apply font-bold;
            @apply my-6;
          }

          article,
          aside,
          nav,
          section {
            h1 {
              @apply text-xs;
              @apply font-bold;
              @apply my-10;
            }
          }
        }
      }
    }
  }

  ul,
  menu {
    // should be my-4 for proper reset, but thats ugly af
    @apply list-disc;
    @apply my-1;
    @apply pl-10;
  }

  ol {
    @apply list-decimal;
    @apply my-4;
    @apply pl-10;
  }

  ul,
  ol {
    ul {
      list-style-type: circle;
    }

    ul,
    ol {
      ul {
        list-style-type: square;
      }
    }
  }

  dd {
    @apply pl-10;
  }

  dl {
    @apply my-4;
  }

  ul,
  ol,
  menu,
  dl {
    ul,
    ol,
    menu,
    dl {
      margin: 0;
    }
  }

  legend {
    @apply py-0;
    @apply px-1;
  }

  fieldset {
    @apply my-0;
    @apply mx-1;
    @apply pt-0;
    @apply px-1;
    @apply pb-2;
  }

  b,
  strong {
    font-weight: bold;
    @apply text-yellow-500;
  }

  pre {
    @apply my-4;
  }
}
</style>