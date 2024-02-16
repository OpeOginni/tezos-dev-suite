<script lang='ts'>
    export let currentNetwork: string

  </script>
  
  <main>
    <div class="card">
        <p class="text">Current Network: <span class="network">{currentNetwork.toLocaleUpperCase()}</span></p>
    </div>
  </main>
  
  <style>
    /* Add your styles here */
    .text{
        color: white;
    }
    .network{
        font-size: large;
        font-weight: 400;
        font: bold;
    }
  </style>
  