<template>
<div id="paypal-button-container-P-8P834504WV221941YM2BAHYA"></div>

</template>
<script>
  paypal.Buttons({
      style: {
          shape: 'rect',
          color: 'blue',
          layout: 'vertical',
          label: 'subscribe'
      },
      createSubscription: function(data, actions) {
        return actions.subscription.create({
          /* Creates the subscription */
          plan_id: 'P-8P834504WV221941YM2BAHYA'
        });
      },
      onApprove: function(data, actions) {
        alert(data.subscriptionID); // You can add optional success message for the subscriber here
      }
  }).render('#paypal-button-container-P-8P834504WV221941YM2BAHYA'); // Renders the PayPal button
</script>