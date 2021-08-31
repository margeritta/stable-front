<template>
  <v-container>
    <p class="display-3 font-weight-light text-center pa-4">
      Kalendarz - Jazdy
    </p>
    <v-card>
      <div class="iframe-container">
        <iframe
          src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23795548&ctz=Europe%2FWarsaw&src=aW83NXFwa2JqYXZkZTEwZTRlbDh2amM4aWtAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=cGwucG9saXNoI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23A79B8E&color=%230B8043&showTitle=1&showPrint=0&showCalendars=0&title=Jazdy%20-%20Stadnina%20Dworska"
          style="border-width: 0"
          width="1200"
          height="600"
          frameborder="0"
          scrolling="no"
        ></iframe>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
.iframe-container {
  text-align: center;
  width: 100%;
}
</style>