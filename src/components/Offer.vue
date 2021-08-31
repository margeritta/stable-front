<template>
  <div>
    <v-container>
      <p class="display-3 font-weight-light text-center pa-4">Oferta</p>
      <v-card elevation="2" justify="center">
        <v-card-title primary-title class="justify-center font-weight-light">
          <div>
            <h1 class="font-weight-light">Stadnina Dworska</h1>
          </div>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-card-text class="text--primary text-center">
          <div>
            <div class="font-weight-light text-h5" style="font-size: 1.5em"
              >Oferujemy profesjonalną naukę jazdy konnej zarówno dla dzieci,
              jak i dla dorosłych. Zapraszamy wszystkich, którzy lubią konie,
              kontakt z naturą lub po prostu chcą odpocząć w przyjaznej
              atmosferze.
            </div>
          </div>
          <div class="pa-5">
            <div>
              <div class="font-weight-light text-h6" style="font-size: 1.5em"
                >CENNIK JAZD</div
              >
            </div>
            <div>
              <div class="font-weight-light text-h6" style="font-size: 1.5em"
                >Lonża 30min - 40 zł</div
              >
            </div>
            <div>
              <div class="font-weight-light text-h6" style="font-size: 1.5em"
                >Jazda samodzielna 50/60min - 60 zł</div
              >
            </div>
            <div>
              <div class="font-weight-light text-h6" style="font-size: 1.5em"
                >Jazda skokowa - 80 zł</div
              >
            </div>
          </div>
          <div class="pa-5">
              <div class="font-weight-light text-h6" style="font-size: 1.5em"
                >INNE USŁUGI</div
              >
              <div>
              <div class="font-weight-light text-h6" style="font-size: 1.5em"
                >Wynajęcie krytej ujeżdżalni 60min - 50 zł</div
              >
            </div>
            <div>
              <div class="font-weight-light text-h6" style="font-size: 1.5em"
                >Wynajęcie placu 60min - 20 zł</div
              >
            </div>
            <div>
              <div class="font-weight-light text-h6" style="font-size: 1.5em"
                >Użyczenie konia do sesji zdjęciowej 60min - 100 zł</div
              >
            </div>
            <div>
              <div class="font-weight-light text-h6" style="font-size: 1.5em"
                >Organizacja przyjęć urodzinowych - indywidualna wycena</div
              >
            </div>
          </div>
        <v-row class="fill-height pa-2" align="center" justify="center">
          <div class="display-2 white--text pl-5 pr-5 hidden-sm-only">
            <v-img
              :src="require('../assets/img/home/logo.png')"
              height="140px"
              width="210"
            >
            </v-img>
          </div>
          <br />
        </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>