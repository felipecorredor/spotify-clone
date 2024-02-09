<script lang="ts">

  const currentTime = new Date()
  const currentHour = currentTime.getHours()

  let gretting = ""

  if (currentHour < 12) {
    gretting = "Good Morning"
  } else if (currentHour < 18){
    gretting = "Good Afternoon"
  } else {
    gretting = "Good Evening"
  }


</script>

<h1 class="text-3xl font-bold">
  {gretting}
</h1>
