export async function confirmPayment(requestData) {
  // const secretKey = "test_sk_AQ92ymxN34P0bOmBeEZv3ajRKXvd";

  const encryptedSecretKey = btoa("test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6:");

  const response = await fetch(
    "https://api.tosspayments.com/v1/payments/confirm",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${encryptedSecretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    }
  );

  const json = await response.json();

  return { response, json };
}
